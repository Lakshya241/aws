# DevSense Backend

FastAPI-based backend service for DevSense AI Code Assistant. Provides intelligent code analysis, repository ingestion, and AI-powered Q&A capabilities.

## Features

- 🔍 **Repository Ingestion** - Clone and analyze Git repositories
- 🧠 **Vector Search** - FAISS-based semantic code search
- 💬 **AI Chat** - Context-aware code assistance
- 🔗 **Dependency Analysis** - Track code dependencies
- 📊 **Architecture Generation** - Auto-generate project overviews
- 🤖 **Multiple AI Providers** - Support for Claude, Gemini, OpenAI, Bedrock

## Tech Stack

- **Framework**: FastAPI
- **AI Models**: Anthropic Claude, Google Gemini, OpenAI, AWS Bedrock
- **Vector Store**: FAISS
- **Embeddings**: AWS Titan or local embeddings
- **Language**: Python 3.12+

## Prerequisites

- Python 3.12 or higher
- Git
- API key for at least one AI provider (Claude, Gemini, OpenAI, or AWS)

## Installation

1. **Clone the repository**
   ```bash
   cd devsense-backend
   ```

2. **Create virtual environment (recommended)**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `devsense-backend` directory:

   ```env
   # LLM Provider Selection (choose one: anthropic, gemini, openai, bedrock)
   LLM_PROVIDER=anthropic

   # Anthropic Claude (Recommended)
   ANTHROPIC_API_KEY=your_anthropic_api_key_here

   # Google Gemini (Free tier available)
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-2.5-flash

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key_here

   # AWS Bedrock
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=us-east-1

   # Application Settings
   MAX_FILES=10000
   MAX_FILE_SIZE=500000
   MAX_CHUNKS=10000
   EMBED_DIM=1536
   ```

## Getting API Keys

### Anthropic Claude (Recommended)
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up/Login
3. Navigate to API Keys
4. Create new API key
5. Copy and add to `.env`

### Google Gemini (Free Tier)
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Get API Key"
4. Copy and add to `.env`

### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up/Login
3. Navigate to API Keys
4. Create new API key
5. Copy and add to `.env`

### AWS Bedrock
1. AWS Console → Bedrock → Model access
2. Request access to Claude 3.5 Sonnet and Titan Embeddings
3. Create IAM user with Bedrock permissions
4. Add credentials to `.env`

## Running the Server

### Development Mode

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will start at:
- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

## API Endpoints

### Health Check
```http
GET /
```
Returns server status.

### Ingest Repository
```http
POST /ingest
Content-Type: application/json

{
  "repo_url": "https://github.com/user/repo",
  "project_name": "my-project"
}
```
Clones and indexes a Git repository.

### Query Codebase
```http
POST /query
Content-Type: application/json

{
  "project_name": "my-project",
  "session_id": "unique-session-id",
  "query": "How does authentication work?"
}
```
Ask questions about the ingested codebase.

### Get Dependencies
```http
GET /dependencies?project_name=my-project
```
Returns project dependencies (package.json, requirements.txt).

### Get File Tree
```http
GET /file-tree?project_name=my-project
```
Returns project file structure.

### Generate Architecture
```http
GET /generate-architecture?project_name=my-project
```
Generates high-level architecture overview.

### Impact Analysis
```http
POST /impact-analysis
Content-Type: application/json

{
  "file_path": "src/auth/login.py"
}
```
Analyzes dependencies and impact of a file.

### Submit Feedback
```http
POST /feedback
Content-Type: application/json

{
  "project_name": "my-project",
  "rating": 5,
  "feedback_text": "Great tool!",
  "category": "general"
}
```
Submit user feedback.

### Get Settings
```http
GET /settings
```
Returns backend configuration.

## Project Structure

```
devsense-backend/
├── app/
│   ├── main.py                    # FastAPI application
│   ├── config.py                  # Configuration settings
│   ├── ingestion.py               # Repository ingestion logic
│   ├── query_engine.py            # Query processing
│   ├── embeddings.py              # Embedding generation
│   ├── llm_service.py             # LLM provider router
│   ├── llm_service_gemini.py      # Google Gemini integration
│   ├── llm_service_anthropic.py   # Anthropic Claude integration
│   ├── llm_service_openai.py      # OpenAI integration
│   ├── llm_service_bedrock.py     # AWS Bedrock integration
│   ├── vector_store.py            # FAISS vector store
│   ├── chunking.py                # Code chunking logic
│   ├── cache.py                   # Caching utilities
│   ├── chat_memory.py             # Chat history management
│   ├── dependency_analyzer.py     # Dependency analysis
│   ├── error_analyzer.py          # Error analysis
│   └── architecture_analyzer.py   # Architecture analysis
├── data/
│   ├── indexes/                   # FAISS vector indexes
│   ├── metadata/                  # Code chunk metadata
│   ├── repos/                     # Cloned repositories
│   └── feedback/                  # User feedback logs
├── requirements.txt               # Python dependencies
├── .env                          # Environment variables
└── README.md                     # This file
```

## Supported File Types

The backend can analyze the following file types:
- Python: `.py`
- JavaScript/TypeScript: `.js`, `.jsx`, `.ts`, `.tsx`
- Java: `.java`
- Go: `.go`
- Ruby: `.rb`
- PHP: `.php`
- C/C++: `.c`, `.cpp`, `.h`, `.hpp`
- C#: `.cs`
- Swift: `.swift`
- Kotlin: `.kt`
- Rust: `.rs`
- Markdown: `.md`
- JSON: `.json`
- YAML: `.yml`, `.yaml`

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LLM_PROVIDER` | AI provider (anthropic, gemini, openai, bedrock) | `anthropic` |
| `ANTHROPIC_API_KEY` | Anthropic API key | - |
| `GEMINI_API_KEY` | Google Gemini API key | - |
| `GEMINI_MODEL` | Gemini model name | `gemini-2.5-flash` |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `AWS_ACCESS_KEY_ID` | AWS access key | - |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | - |
| `AWS_REGION` | AWS region | `us-east-1` |
| `MAX_FILES` | Maximum files to process | `10000` |
| `MAX_FILE_SIZE` | Maximum file size (bytes) | `500000` |
| `MAX_CHUNKS` | Maximum chunks to store | `10000` |
| `EMBED_DIM` | Embedding dimension | `1536` |

## Switching AI Providers

To switch between AI providers, simply change the `LLM_PROVIDER` in your `.env` file:

```env
# Use Claude
LLM_PROVIDER=anthropic

# Use Gemini
LLM_PROVIDER=gemini

# Use OpenAI
LLM_PROVIDER=openai

# Use AWS Bedrock
LLM_PROVIDER=bedrock
```

Restart the server after changing providers.

## Development

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
black app/
```

### Type Checking

```bash
mypy app/
```

### Linting

```bash
flake8 app/
```

## Troubleshooting

### Server won't start
- Verify Python 3.12+ is installed: `python --version`
- Check all dependencies are installed: `pip install -r requirements.txt`
- Ensure `.env` file exists and is configured

### AI responses return errors
- Verify API key is correct in `.env`
- Check `LLM_PROVIDER` matches your configured provider
- Restart server after changing `.env`
- Check API key has sufficient credits/quota

### Repository ingestion fails
- Ensure Git is installed: `git --version`
- Verify repository URL is correct and accessible
- Check disk space is available
- Try with a smaller repository first

### Out of memory errors
- Reduce `MAX_FILES` in `.env`
- Reduce `MAX_FILE_SIZE` in `.env`
- Reduce `MAX_CHUNKS` in `.env`
- Use a smaller repository for testing

## Performance Tips

1. **Use appropriate limits**: Adjust `MAX_FILES`, `MAX_FILE_SIZE`, and `MAX_CHUNKS` based on your system
2. **Choose the right AI provider**: Gemini offers free tier, Claude offers best quality
3. **Cache responses**: The system automatically caches similar queries
4. **Limit repository size**: Focus on specific directories if possible

## Security Notes

- Never commit `.env` file to version control
- Keep API keys secure and rotate regularly
- Use environment-specific API keys (dev/prod)
- Implement rate limiting in production
- Use HTTPS in production deployments

## License

MIT

## Support

For issues or questions:
- Open an issue on GitHub
- Check the main project README
- Review API documentation at `/docs`
