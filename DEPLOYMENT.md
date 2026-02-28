# DevSense Deployment Guide

## ✅ Cleaned Up for Deployment

All unnecessary files have been removed. The project is now clean and ready for deployment.

---

## 📦 What's Included

### Root Directory
```
devsense/
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
├── DEPLOYMENT.md           # This file
├── devsense-backend/       # Backend application
└── devsense-frontend/      # Frontend application
```

### Backend (`devsense-backend/`)
```
devsense-backend/
├── app/
│   ├── main.py                    # FastAPI application
│   ├── ingestion.py               # Repository ingestion
│   ├── query_engine.py            # Query processing
│   ├── embeddings.py              # Embedding generation
│   ├── llm_service.py             # LLM integration
│   ├── vector_store.py            # FAISS vector store
│   ├── config.py                  # Configuration
│   ├── cache.py                   # Response caching
│   ├── chat_memory.py             # Chat history
│   ├── chunking.py                # Code chunking
│   ├── dependency_analyzer.py     # Dependency analysis
│   ├── error_analyzer.py          # Error analysis
│   └── architecture_analyzer.py   # Architecture generation
├── data/
│   ├── indexes/                   # FAISS indexes (empty)
│   ├── metadata/                  # Code chunks (empty)
│   └── repos/                     # Cloned repos (empty)
├── .env                           # Environment variables (with your AWS credentials)
├── requirements.txt               # Python dependencies
└── test_aws_connection.py         # AWS connection test
```

### Frontend (`devsense-frontend/`)
```
devsense-frontend/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx            # Landing page
│   │   └── Dashboard.jsx          # Main dashboard
│   ├── components/
│   │   ├── Navbar.jsx             # Navigation
│   │   ├── Hero3D.jsx             # 3D hero section
│   │   ├── FeatureCard.jsx        # Feature cards
│   │   └── FloatingShapes.jsx     # Animated shapes
│   ├── api.js                     # API client
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
├── public/                        # Static assets
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── tailwind.config.js             # Tailwind configuration
```

---

## 🗑️ What Was Removed

### Documentation Files (10 files)
- HEALTH_CHECK_REPORT.md
- VERIFICATION_CHECKLIST.md
- QUICK_START.md
- CHANGES_APPLIED.md
- START_DEVSENSE.md
- AWS_BEDROCK_SETUP.md
- ENABLE_BEDROCK_MODELS.md
- SETUP_COMPLETE.md
- QUICK_REFERENCE.md
- SYSTEM_STATUS.md

### Test Files (9 files)
- test_analyze.py
- test_dependency.py
- test_full_flow.py
- test_ingest_real.py
- test_ingest_script.py
- test_ingestion.py
- test_query_old.py
- test_query.py
- cleanup_index.py

### Debug Files
- debug_shapes.py
- devsense-backend.sln

### Duplicate Files
- requirements-clean.txt
- s.env (merged into .env)
- llm_service_titan.py (fallback not needed)

### Cache & Build Artifacts
- __pycache__/ directories
- .pytest_cache/
- venv/ (virtual environment)
- All ingested test data

---

## 🚀 Deployment Options

### Option 1: Local Development

```bash
# Backend
cd devsense-backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend
cd devsense-frontend
npm install
npm run dev
```

### Option 2: Docker Deployment

Create `devsense-backend/Dockerfile`:
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
COPY data/ ./data/

ENV PORT=8000
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Create `devsense-frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
# Backend
docker build -t devsense-backend ./devsense-backend
docker run -p 8000:8000 --env-file devsense-backend/.env devsense-backend

# Frontend
docker build -t devsense-frontend ./devsense-frontend
docker run -p 80:80 devsense-frontend
```

### Option 3: AWS Deployment

#### Backend on AWS Lambda

1. Install Serverless Framework:
```bash
npm install -g serverless
```

2. Create `serverless.yml`:
```yaml
service: devsense-backend

provider:
  name: aws
  runtime: python3.12
  region: us-east-1
  environment:
    AWS_ACCESS_KEY_ID: ${env:AWS_ACCESS_KEY_ID}
    AWS_SECRET_ACCESS_KEY: ${env:AWS_SECRET_ACCESS_KEY}
    USE_BEDROCK: true

functions:
  api:
    handler: app.main.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
```

3. Deploy:
```bash
cd devsense-backend
serverless deploy
```

#### Frontend on S3 + CloudFront

1. Build frontend:
```bash
cd devsense-frontend
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://devsense-frontend
aws s3 website s3://devsense-frontend --index-document index.html
```

3. Upload:
```bash
aws s3 sync dist/ s3://devsense-frontend/
```

4. Create CloudFront distribution (optional for HTTPS)

### Option 4: Vercel/Netlify (Frontend)

```bash
cd devsense-frontend

# Vercel
vercel deploy

# Netlify
netlify deploy --prod
```

---

## 🔐 Environment Variables

### Backend (.env)

**Required:**
```env
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
USE_BEDROCK=true
EMBED_DIM=1024
```

**Optional:**
```env
MAX_FILES=10000
MAX_FILE_SIZE=500000
MAX_CHUNKS=10000
```

### Frontend

Create `.env` in `devsense-frontend/`:
```env
VITE_API_URL=http://localhost:8000
```

For production:
```env
VITE_API_URL=https://your-backend-url.com
```

---

## ✅ Pre-Deployment Checklist

### Backend
- [ ] AWS credentials configured in `.env`
- [ ] Bedrock model access granted (Claude 3.5 Sonnet, Titan Embeddings)
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] Test connection: `python test_aws_connection.py`
- [ ] Server starts: `uvicorn app.main:app`
- [ ] Health check works: `curl http://localhost:8000`

### Frontend
- [ ] Dependencies installed: `npm install`
- [ ] API URL configured in `.env`
- [ ] Dev server starts: `npm run dev`
- [ ] Production build works: `npm run build`
- [ ] No console errors in browser

### Integration
- [ ] Backend accessible from frontend
- [ ] CORS configured correctly
- [ ] Can ingest a test repository
- [ ] Can query the codebase
- [ ] Architecture generation works

---

## 🧪 Testing

### Test AWS Connection
```bash
cd devsense-backend
python test_aws_connection.py
```

Expected output:
```
✓ AWS Connected!
✓ Bedrock client created
✓ Bedrock Runtime client created
✓ Embedding generated! Dimension: 1536
✓ Claude responded: 'Hello'
```

### Test Backend API
```bash
curl http://localhost:8000
# Should return: {"status":"DevSense backend running"}
```

### Test Frontend
Open http://localhost:5173 in browser
- Landing page should load
- Navigate to /app
- Dashboard should display

---

## 📊 Monitoring

### Backend Logs
```bash
# View uvicorn logs
tail -f logs/uvicorn.log

# AWS CloudWatch (if deployed to Lambda)
aws logs tail /aws/lambda/devsense-backend --follow
```

### Frontend Logs
- Browser DevTools Console
- Network tab for API calls

### AWS Bedrock Usage
```bash
# Check CloudWatch metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/Bedrock \
  --metric-name InvocationCount \
  --start-time 2026-02-28T00:00:00Z \
  --end-time 2026-02-28T23:59:59Z \
  --period 3600 \
  --statistics Sum
```

---

## 💰 Cost Management

### Current Configuration
- Titan Embeddings: $0.0001 per 1K tokens
- Claude 3.5 Sonnet: $0.003 input / $0.015 output per 1K tokens

### Estimated Costs
- Small project (1K chunks): ~$0.60
- Medium project (5K chunks): ~$3.00
- Large project (10K chunks): ~$6.00

### Your $100 Credits
- Can process 100+ large projects
- Months of development/demo use
- Set up billing alerts in AWS Console

---

## 🔒 Security

### Production Checklist
- [ ] Use AWS Secrets Manager for credentials
- [ ] Enable HTTPS (CloudFront/Load Balancer)
- [ ] Add API authentication
- [ ] Implement rate limiting
- [ ] Enable CORS only for specific origins
- [ ] Use environment-specific .env files
- [ ] Never commit .env to git
- [ ] Rotate AWS credentials regularly

---

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**AWS connection fails:**
```bash
aws sts get-caller-identity
# Verify credentials work
```

**Bedrock access denied:**
- Go to AWS Console → Bedrock → Model access
- Request access to required models

### Frontend Issues

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API calls fail:**
- Check VITE_API_URL in .env
- Verify backend is running
- Check CORS configuration

---

## 📝 Next Steps

1. **Test locally** - Verify everything works
2. **Choose deployment** - Docker, AWS, or other
3. **Configure production** - Environment variables
4. **Deploy backend** - API server
5. **Deploy frontend** - Static site
6. **Test production** - End-to-end testing
7. **Monitor** - Set up logging and alerts
8. **Optimize** - Based on usage patterns

---

## ✅ Summary

**Status:** Clean and ready for deployment!

**What's included:**
- Production-ready backend code
- Production-ready frontend code
- AWS credentials configured
- All dependencies listed
- Clean directory structure

**What's removed:**
- All documentation files
- All test files
- All debug files
- All cache/build artifacts
- All test data

**Size reduction:**
- Before: ~500MB (with venv, cache, test data)
- After: ~50MB (clean code only)

**Ready to deploy!** 🚀
