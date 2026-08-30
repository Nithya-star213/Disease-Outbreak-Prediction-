# PulseWatch India - Deployment Guide

## 🚀 Deployment Options

### 1. Local Development

**Quickest setup for development:**

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Initialize database
python -c "from app import app; from database import init_database, seed_database; init_database(app); seed_database(app)"

# Run server
python app.py
```

Access at: `http://localhost:5000`

---

### 2. Heroku Deployment

**Prerequisites:**
- Heroku CLI installed
- Git repository
- Free Heroku account

**Steps:**

1. **Create Heroku app:**
```bash
heroku create pulsewatch-india
```

2. **Add PostgreSQL addon:**
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. **Create Procfile:**
```
web: gunicorn app:app
```

4. **Create runtime.txt:**
```
python-3.10.0
```

5. **Set environment variables:**
```bash
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=your-secret-key
heroku config:set FLASK_DEBUG=False
```

6. **Deploy:**
```bash
git push heroku main
```

7. **Initialize database:**
```bash
heroku run python -c "from app import app; from database import init_database, seed_database; init_database(app); seed_database(app)"
```

---

### 3. AWS EC2 Deployment

**Prerequisites:**
- AWS EC2 instance (Ubuntu 20.04+)
- Elastic IP
- Security groups configured

**Steps:**

1. **SSH into instance:**
```bash
ssh -i your-key.pem ubuntu@your-ip
```

2. **Install dependencies:**
```bash
sudo apt update
sudo apt install python3-pip python3-venv postgresql postgresql-contrib nginx
```

3. **Clone repository:**
```bash
git clone https://github.com/Nithya-star213/Disease-Outbreak-Prediction-.git
cd Disease-Outbreak-Prediction
```

4. **Setup Python environment:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

5. **Setup PostgreSQL:**
```bash
sudo -u postgres createdb pulsewatch
sudo -u postgres createuser pulsewatch_user
sudo -u postgres psql -c "ALTER USER pulsewatch_user WITH PASSWORD 'secure_password'"
```

6. **Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/pulsewatch
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static {
        alias /home/ubuntu/Disease-Outbreak-Prediction/static;
    }
}
```

7. **Enable Nginx site:**
```bash
sudo ln -s /etc/nginx/sites-available/pulsewatch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup Systemd service:**
```bash
sudo nano /etc/systemd/system/pulsewatch.service
```

Add:
```ini
[Unit]
Description=PulseWatch India API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Disease-Outbreak-Prediction
Environment="PATH=/home/ubuntu/Disease-Outbreak-Prediction/venv/bin"
Environment="DATABASE_URL=postgresql://pulsewatch_user:secure_password@localhost/pulsewatch"
Environment="SECRET_KEY=your-secret-key"
ExecStart=/home/ubuntu/Disease-Outbreak-Prediction/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

9. **Enable and start service:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable pulsewatch
sudo systemctl start pulsewatch
sudo systemctl status pulsewatch
```

---

### 4. Docker Deployment

**Create Dockerfile:**

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 5000

# Run application
CMD ["python", "app.py"]
```

**Create docker-compose.yml:**

```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: pulsewatch
      POSTGRES_USER: pulsewatch_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  web:
    build: .
    command: python app.py
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://pulsewatch_user:secure_password@db:5432/pulsewatch
      FLASK_ENV: production
      SECRET_KEY: your-secret-key
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs

volumes:
  postgres_data:
```

**Deploy:**

```bash
docker-compose up -d
```

---

### 5. Google Cloud Run Deployment

**Prerequisites:**
- Google Cloud account
- gcloud CLI

**Steps:**

1. **Create project:**
```bash
gcloud projects create pulsewatch-india
gcloud config set project pulsewatch-india
```

2. **Enable services:**
```bash
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

3. **Create Cloud SQL instance:**
```bash
gcloud sql instances create pulsewatch-db --database-version=POSTGRES_13
gcloud sql databases create pulsewatch --instance=pulsewatch-db
```

4. **Deploy to Cloud Run:**
```bash
gcloud run deploy pulsewatch-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --memory 2Gb \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL=postgresql://...
```

---

## 🔄 Continuous Integration/Deployment (CI/CD)

### GitHub Actions Workflow

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.10
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Run tests
      run: pytest tests/
    
    - name: Deploy to Heroku
      env:
        HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      run: |
        heroku login
        git push heroku main
```

---

## 📊 Monitoring & Logging

### Application Logging

Logs are written to `logs/pulsewatch.log`

**Configure log rotation:**

```bash
sudo apt-get install logrotate
sudo nano /etc/logrotate.d/pulsewatch
```

Add:
```
/home/ubuntu/Disease-Outbreak-Prediction/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 ubuntu ubuntu
}
```

### Monitoring with Prometheus

**Install Prometheus:**

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.30.0/prometheus-2.30.0.linux-amd64.tar.gz
tar xvfz prometheus-2.30.0.linux-amd64.tar.gz
```

**Add to requirements.txt:**
```
prometheus-flask-exporter==0.20.3
```

**Update app.py:**
```python
from prometheus_flask_exporter import PrometheusMetrics

metrics = PrometheusMetrics(app)
```

---

## 🔐 Security Best Practices

### Environment Variables

Never commit secrets:

```bash
# Create .env (add to .gitignore)
SECRET_KEY=generate-secure-random-key
DATABASE_URL=postgresql://...
JWT_SECRET=generate-another-random-key
```

### SSL/TLS Certificate

Use Let's Encrypt:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

Update Nginx:
```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ...
}
```

### Database Security

**PostgreSQL connection:**

```bash
# Create user with limited permissions
createuser -P pulsewatch_readonly
psql -c "GRANT SELECT ON ALL TABLES IN SCHEMA public TO pulsewatch_readonly;"
```

---

## 📈 Scaling

### Load Balancing with Nginx

```nginx
upstream backend {
    server 127.0.0.1:5000;
    server 127.0.0.1:5001;
    server 127.0.0.1:5002;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

### Using Gunicorn Workers

```bash
gunicorn -w 8 -b 0.0.0.0:5000 --workers-class sync app:app
```

### Redis Caching

```python
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'redis'})
```

---

## 🆘 Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Connect to database
psql -U pulsewatch_user -d pulsewatch
```

### Application Crashes

```bash
# Check systemd logs
sudo journalctl -u pulsewatch -f

# Check application logs
tail -f logs/pulsewatch.log
```

### Memory Issues

```bash
# Check memory usage
free -h

# Monitor process
htop
```

---

## 📞 Support

For deployment issues:
1. Check logs: `logs/pulsewatch.log`
2. Verify environment variables
3. Test database connection
4. Check network/firewall settings

---

**Last Updated**: 2026-08-30
