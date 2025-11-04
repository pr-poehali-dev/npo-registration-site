import json
import smtplib
import os
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, EmailStr, Field, ValidationError

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    email: EmailStr

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form submissions via email
    Args: event - dict with httpMethod, body containing name, phone, email
          context - object with request_id attribute
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        contact = ContactRequest(**body_data)
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Validation error', 'details': e.errors()})
        }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'})
        }
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    contact_email = os.environ.get('CONTACT_EMAIL')
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта от {contact.name}'
    msg['From'] = smtp_user
    msg['To'] = contact_email
    
    html_body = f"""
    <html>
      <head>
        <style>
          body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
          .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
          .header {{ background: linear-gradient(135deg, #8B5CF6 0%, #0EA5E9 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
          .content {{ background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }}
          .field {{ margin-bottom: 15px; }}
          .label {{ font-weight: bold; color: #8B5CF6; }}
          .value {{ color: #333; }}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 Новая заявка с сайта НКО Регистрация</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">👤 Имя:</span>
              <span class="value">{contact.name}</span>
            </div>
            <div class="field">
              <span class="label">📞 Телефон:</span>
              <span class="value">{contact.phone}</span>
            </div>
            <div class="field">
              <span class="label">✉️ Email:</span>
              <span class="value">{contact.email}</span>
            </div>
            <hr>
            <p style="color: #666; font-size: 12px;">Заявка отправлена через форму контактов на сайте</p>
          </div>
        </div>
      </body>
    </html>
    """
    
    text_body = f"""
    Новая заявка с сайта НКО Регистрация
    
    Имя: {contact.name}
    Телефон: {contact.phone}
    Email: {contact.email}
    
    ---
    Заявка отправлена через форму контактов на сайте
    """
    
    part1 = MIMEText(text_body, 'plain')
    part2 = MIMEText(html_body, 'html')
    msg.attach(part1)
    msg.attach(part2)
    
    database_url = os.environ.get('DATABASE_URL')
    lead_id = None
    
    if database_url:
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO leads (name, phone, email, status) VALUES (%s, %s, %s, %s) RETURNING id",
                (contact.name, contact.phone, contact.email, 'new')
            )
            lead_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
            conn.close()
        except Exception as db_error:
            pass
    
    email_sent = False
    email_error = None
    
    if all([smtp_host, smtp_user, smtp_password, contact_email]):
        try:
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
            email_sent = True
        except Exception as e:
            email_error = str(e)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Заявка успешно сохранена',
            'lead_id': lead_id,
            'email_sent': email_sent
        })
    }