-- Создание таблицы для хранения заявок
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new'
);

-- Создание индекса для быстрого поиска по дате
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Создание индекса для поиска по статусу
CREATE INDEX idx_leads_status ON leads(status);