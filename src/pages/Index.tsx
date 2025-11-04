import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/d7e41c14-bf02-461c-8d94-ed5329c82630', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.'
        });
        setFormData({ name: '', phone: '', email: '' });
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: 'FileCheck',
      title: 'Регистрация НКО',
      description: 'Полное сопровождение процесса регистрации некоммерческой организации под ключ',
      price: 'от 45 000 ₽'
    },
    {
      icon: 'Building',
      title: 'Создание фондов',
      description: 'Регистрация благотворительных и частных фондов с юридической поддержкой',
      price: 'от 60 000 ₽'
    },
    {
      icon: 'Users',
      title: 'Регистрация ассоциаций',
      description: 'Создание ассоциаций, союзов и объединений юридических лиц',
      price: 'от 55 000 ₽'
    },
    {
      icon: 'Shield',
      title: 'Юридическая защита',
      description: 'Представление интересов НКО в государственных органах',
      price: 'от 30 000 ₽'
    },
    {
      icon: 'FileText',
      title: 'Подготовка документов',
      description: 'Разработка уставов, положений и других учредительных документов',
      price: 'от 25 000 ₽'
    },
    {
      icon: 'RefreshCw',
      title: 'Реорганизация НКО',
      description: 'Помощь в изменении структуры, слиянии или преобразовании организации',
      price: 'от 40 000 ₽'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Консультация',
      description: 'Бесплатная консультация по выбору формы НКО и оценка перспектив регистрации'
    },
    {
      step: '02',
      title: 'Подготовка документов',
      description: 'Сбор необходимых документов и разработка учредительных документов'
    },
    {
      step: '03',
      title: 'Подача заявления',
      description: 'Подача документов в Министерство юстиции через электронную систему'
    },
    {
      step: '04',
      title: 'Получение регистрации',
      description: 'Получение свидетельства о регистрации и постановка на учет в налоговой'
    }
  ];

  const faq = [
    {
      question: 'Сколько времени занимает регистрация НКО?',
      answer: 'Стандартная процедура регистрации занимает от 30 до 45 рабочих дней с момента подачи документов в Минюст. Мы помогаем максимально сократить этот срок за счет правильной подготовки документов.'
    },
    {
      question: 'Какие документы нужны для регистрации?',
      answer: 'Основные документы: заявление о регистрации, устав НКО в 3 экземплярах, протокол учредительного собрания, сведения об учредителях, квитанция об оплате госпошлины. Полный список зависит от формы НКО.'
    },
    {
      question: 'Можно ли зарегистрировать НКО одному человеку?',
      answer: 'Да, некоторые формы НКО (например, фонд) может создать один учредитель. Для других форм (ассоциация, некоммерческое партнерство) требуется минимум 2-3 учредителя.'
    },
    {
      question: 'Какова стоимость государственной пошлины?',
      answer: 'Государственная пошлина за регистрацию НКО составляет 4 000 рублей. Эта сумма не входит в стоимость наших услуг и оплачивается отдельно.'
    },
    {
      question: 'Нужен ли юридический адрес для НКО?',
      answer: 'Да, юридический адрес обязателен. Мы можем помочь с подбором и арендой юридического адреса, соответствующего всем требованиям законодательства.'
    }
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      organization: 'Благотворительный фонд "Доброе сердце"',
      text: 'Профессиональная команда! Зарегистрировали наш фонд быстро и без проблем. Все документы были подготовлены идеально.',
      rating: 5
    },
    {
      name: 'Михаил Сидоров',
      organization: 'Ассоциация предпринимателей',
      text: 'Отличное сопровождение на всех этапах. Особенно помогли с выбором оптимальной формы организации.',
      rating: 5
    },
    {
      name: 'Елена Иванова',
      organization: 'НКО "Развитие культуры"',
      text: 'Спасибо за оперативность и профессионализм! Рекомендую всем, кто планирует создавать НКО.',
      rating: 5
    }
  ];

  const documents = [
    {
      title: 'Устав НКО (образец)',
      description: 'Типовой устав некоммерческой организации',
      icon: 'FileText',
      format: 'DOCX'
    },
    {
      title: 'Заявление на регистрацию',
      description: 'Форма Р11001 для регистрации НКО',
      icon: 'FileSignature',
      format: 'PDF'
    },
    {
      title: 'Протокол учредительного собрания',
      description: 'Образец протокола создания организации',
      icon: 'FileCheck',
      format: 'DOCX'
    },
    {
      title: 'Чек-лист документов',
      description: 'Полный перечень необходимых документов',
      icon: 'ListChecks',
      format: 'PDF'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Scale" className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              НКО Регистрация
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {['Услуги', 'Процесс', 'О нас', 'FAQ', 'Контакты'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item}
              </button>
            ))}
          </nav>

          <Button onClick={() => scrollToSection('контакты')} className="hidden md:flex">
            Получить консультацию
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main>
        <section id="home" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white border-0">
                  ⚡ Быстрая регистрация за 30 дней
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Регистрация НКО{' '}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    под ключ
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Профессиональное юридическое сопровождение регистрации некоммерческих организаций. 
                  Гарантируем результат и полное соответствие законодательству.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-base" onClick={() => scrollToSection('контакты')}>
                    <Icon name="Rocket" className="mr-2 h-5 w-5" />
                    Начать регистрацию
                  </Button>
                  <Button size="lg" variant="outline" className="text-base" onClick={() => scrollToSection('услуги')}>
                    <Icon name="Info" className="mr-2 h-5 w-5" />
                    Узнать подробнее
                  </Button>
                </div>
                <div className="mt-12 grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Зарегистрированных НКО</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-1">98%</div>
                    <div className="text-sm text-muted-foreground">Одобренных заявок</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-1">12 лет</div>
                    <div className="text-sm text-muted-foreground">Опыта работы</div>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in-scale">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-20" />
                <img
                  src="https://cdn.poehali.dev/projects/29385ec4-2da9-4b5b-a273-f1570110f474/files/85322cc1-52bf-40d5-ac51-0021b55b4869.jpg"
                  alt="Команда профессионалов"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="услуги" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="mb-4">Наши услуги</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Полный спектр услуг по{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  регистрации НКО
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Профессиональная помощь на всех этапах создания и развития некоммерческой организации
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon name={service.icon as any} className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{service.price}</span>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                        Подробнее
                        <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="процесс" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="mb-4">Как мы работаем</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Простой процесс{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  регистрации
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Четыре простых шага от консультации до получения свидетельства о регистрации
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div 
                  key={index} 
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-center">
                    <div className="inline-flex h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center mb-6 relative">
                      <span className="text-3xl font-bold text-white">{item.step}</span>
                      {index < process.length - 1 && (
                        <div className="hidden lg:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" onClick={() => scrollToSection('контакты')}>
                <Icon name="Phone" className="mr-2 h-5 w-5" />
                Начать процесс регистрации
              </Button>
            </div>
          </div>
        </section>

        <section id="документы" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="mb-4">Полезные материалы</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Образцы{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  документов
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Скачайте готовые образцы документов для регистрации вашей НКО
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {documents.map((doc, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary group-hover:to-secondary transition-all">
                        <Icon name={doc.icon as any} className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <Badge variant="secondary">{doc.format}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon name="Download" className="mr-2 h-4 w-4" />
                      Скачать образец
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="о нас" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge className="mb-4">О нашей компании</Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Эксперты в регистрации{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    НКО с 2012 года
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Мы — команда профессиональных юристов, специализирующихся на регистрации и правовом 
                  сопровождении некоммерческих организаций. За время работы помогли создать более 500 НКО 
                  различных форм и направлений деятельности.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="CheckCircle" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Гарантия результата</h4>
                      <p className="text-muted-foreground">Возврат средств, если регистрация не состоится по нашей вине</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="Clock" className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Быстрые сроки</h4>
                      <p className="text-muted-foreground">Оптимизированный процесс позволяет сократить время регистрации</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="Award" className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Опыт и экспертиза</h4>
                      <p className="text-muted-foreground">Наши юристы знают все тонкости законодательства о НКО</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in-scale">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-accent rounded-3xl blur-2xl opacity-20" />
                <img
                  src="https://cdn.poehali.dev/projects/29385ec4-2da9-4b5b-a273-f1570110f474/files/ba65309b-c73f-405f-8c2e-aab281680087.jpg"
                  alt="Наша команда"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="отзывы" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="mb-4">Отзывы клиентов</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Что говорят о нас{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  наши клиенты
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index}
                  className="animate-fade-in hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="text-sm">{testimonial.organization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="mb-4">Вопросы и ответы</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Частые{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  вопросы
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ответы на самые популярные вопросы о регистрации НКО
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faq.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-xl px-6 bg-card animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-semibold text-lg pr-4">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="цены" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="mb-4">Тарифы</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Прозрачные{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  цены
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Выберите оптимальный тариф для вашей задачи
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="animate-fade-in hover:shadow-xl transition-all">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">Базовый</Badge>
                  <CardTitle className="text-2xl mb-2">Консультация</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">Бесплатно</span>
                  </div>
                  <CardDescription>Для тех, кто только планирует</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Консультация юриста 30 мин</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Анализ перспектив регистрации</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Подбор формы НКО</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => scrollToSection('контакты')}>
                    Получить консультацию
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary animate-fade-in hover:shadow-2xl transition-all relative" style={{ animationDelay: '100ms' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                    Популярный
                  </Badge>
                </div>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2 border-primary text-primary">Стандарт</Badge>
                  <CardTitle className="text-2xl mb-2">Под ключ</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">45 000 ₽</span>
                  </div>
                  <CardDescription>Полное сопровождение регистрации</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Все из тарифа "Базовый"</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Подготовка всех документов</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Подача в Минюст</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Получение свидетельства</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Постановка на налоговый учет</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => scrollToSection('контакты')}>
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>

              <Card className="animate-fade-in hover:shadow-xl transition-all" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">Премиум</Badge>
                  <CardTitle className="text-2xl mb-2">VIP</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">75 000 ₽</span>
                  </div>
                  <CardDescription>Максимальное сопровождение</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Все из тарифа "Стандарт"</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Приоритетное обслуживание</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Юридическая поддержка 6 мес</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Помощь с юридическим адресом</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Check" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Личный менеджер</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => scrollToSection('контакты')}>
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="контакты" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <Badge className="mb-4">Свяжитесь с нами</Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Готовы начать{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    регистрацию?
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Оставьте заявку, и мы свяжемся с вами в течение 15 минут
                </p>
              </div>

              <Card className="animate-fade-in-scale">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Phone" className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Телефон</h4>
                          <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                          <p className="text-sm text-muted-foreground">Пн-Пт с 9:00 до 18:00</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="Mail" className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Email</h4>
                          <p className="text-muted-foreground">info@nko-registration.ru</p>
                          <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon name="MapPin" className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Офис</h4>
                          <p className="text-muted-foreground">Москва, ул. Тверская, д. 1</p>
                          <p className="text-sm text-muted-foreground">БЦ "Центр", 5 этаж</p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Иван Иванов"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Телефон</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+7 (999) 123-45-67"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@mail.ru"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Icon name="Send" className="mr-2 h-5 w-5" />
                            Отправить заявку
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                      </p>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Scale" className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">НКО Регистрация</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональная регистрация некоммерческих организаций с 2012 года
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Регистрация НКО</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Создание фондов</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Регистрация ассоциаций</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Юридическая защита</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#о нас" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#отзывы" className="hover:text-primary transition-colors">Отзывы</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">Вопросы и ответы</a></li>
                <li><a href="#контакты" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@nko-registration.ru</li>
                <li>Москва, ул. Тверская, д. 1</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 НКО Регистрация. Все права защищены.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;