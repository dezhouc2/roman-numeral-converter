# Roman Numeral Converter
A full-stack web application that converts integers (1-3999) to Roman numerals

**🔗 Repository**: https://github.com/dezhouc2/roman-numeral-converter

## Summary

I built this Roman numeral converter using Express.js and React with Adobe Spectrum, choosing JavaScript over TypeScript for faster development within the assessment timeline while meeting all Adobe requirements. The solution implements a greedy algorithm based on Wikipedia's specification, includes comprehensive Jest testing, and provides full observability with logging, metrics, and tracing endpoints. The entire application is containerized with Docker for production deployment

## ✨ Features
- ** RESTful API **: Fast Express.js backend with Roman numeral conversion
- ** React Frontend **: Adobe React Spectrum component integration 
- ** Theme Support **: Automatic light/dark mode based on system settings
- ** Comprehensive Testing **: 6 unit tests covering all edge cases and error conditions
- ** Production Observability **: Complete logs, metrics, and traces implementation
- ** Docker Ready **: Containerized deployment with docker-compose
- ** Responsive Design **: Works seamlessly on desktop and mobile
- ** Real-time Validation **: Instant input validation and error handling

## 🏗️ Architecture
```
roman-numeral-converter
├── backend
│   ├── src
│   │   ├── server.js
│   │   ├── romanConverter.js
│   │   └── __tests__
│   │       └── romanConverter.test.js
│   └── package.json
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── .gitignore
├── README.md
├── Dockerfile
└── docker-compose.yml
```

## ⚡ Quick Start
```bash
git clone https://github.com/dezhouc2/roman-numeral-converter.git
cd roman-numeral-converter
```

### Option 1: Docker
If you have Docker installed, you can run the entire application with one command:
```bash
docker-compose up --build
```
Then visit http://localhost:8080 to access the API and use the conversion endpoints.

### Option 2: Local Development

If you have Node.js installed, you can run both frontend and backend locally:

```bash
# Terminal 1: Start backend
cd backend
npm install
npm run dev

# Terminal 2: Start frontend  
cd frontend
npm install
npm start
```

Visit http://localhost:3000 for the full UI experience, or http://localhost:8080 for API access.

## 🧮 Algorithm

The Roman numeral conversion is based on the [Wikipedia Roman Numerals specification](https://en.wikipedia.org/wiki/Roman_numerals) and implements a greedy algorithm using the standard mappings:

- **Basic symbols**: I=1, V=5, X=10, L=50, C=100, D=500, M=1000
- **Subtractive notation**: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900
- **Valid range**: 1 to 3999 (conventional Roman numeral range)

The algorithm processes mappings in descending order, ensuring proper formation according to standard rules.

## 📚 API Documentation

### Convert Number to Roman Numeral

```bash
curl "http://localhost:8080/romannumeral?query=42"
# Returns: {"input":"42","output":"XLII","traceId":"1752721714572-ckzbro4dp"}

#Error Handling
curl "http://localhost:8080/romannumeral?query=4000"
# Returns: Number must be between 1 and 3999
```

### Health Check & Metrics

```bash
# Health status
curl "http://localhost:8080/health"

# Application metrics  
curl "http://localhost:8080/metrics"
```

## 🛠️ Technology Choices

### Backend Stack
- **Express.js**
- **JavaScript**
- **Winston**
- **Jest**

### Frontend Stack  
- **React**
- **Adobe React Spectrum**
- **Fetch API**

### Infrastructure
- **Docker**
- **Node.js 18**

### Observability Implementation
- **Logs**
- **Metrics**
- **Traces**

## ✅ Testing

Run the comprehensive test suite to verify functionality:

```bash
cd backend
npm test
```

**Test Coverage:**
- ✅ Basic numeral conversion (I, V, X, L, C, D, M)
- ✅ Subtractive notation (IV, IX, XL, XC, CD, CM)  
- ✅ Complex numbers (27→XXVII, 1984→MCMLXXXIV)
- ✅ Edge cases (1→I, 3999→MMMCMXCIX)
- ✅ Error handling (0, 4000, invalid inputs)
- ✅ Validation logic

```
 PASS  src/__tests__/romanConverter.test.js
  Roman Numeral Converter
    convertToRoman
      √ should convert basic numerals correctly (2 ms)
      √ should handle subtractive notation correctly
      √ should convert complex numbers correctly (1 ms)
      √ should handle edge cases correctly
      √ should throw error for invalid inputs (5 ms)
    isValidRomanNumber
      √ should validate numbers correctly

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.409 s, estimated 1 s
Ran all test suites.
```

## 🚀 Production Deployment

### Environment Variables
```bash
# Server port
PORT=8080
# Environment mode               
NODE_ENV=production   
```

### Docker Production Build
```bash
# Build optimized container
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f
```

### Monitoring Endpoints
- **Health**: `GET /health` - Service health and uptime
- **Metrics**: `GET /metrics` - Request counts, errors, performance
- **Tracing**: All requests include unique trace IDs for debugging

## 🔧 Development

### Project Structure
The codebase prioritizes **readability over cleverness**. Each component has a single responsibility:

- `romanConverter.js`: Pure algorithm logic, no dependencies
- `server.js`: HTTP interface, routing, and middleware  
- `App.js`: React UI component with state management
- `App.css`: Responsive styling with theme support


## 🐛 Troubleshooting

**Docker not starting?**
- Ensure Docker Desktop is running
- Try `docker system prune` to clean up resources
- Check port 8080 isn't already in use

**Frontend not connecting to backend?**
- Verify backend is running on port 8080
- Check browser console for CORS errors
- Ensure both services are running simultaneously

**Tests failing?**
- Run `npm install` in backend directory
- Verify Node.js version 18+ is installed
- Check that test files are in `__tests__` directory

**Performance issues?**
- Check `/metrics` endpoint for server statistics
- Review logs for error patterns
- Monitor Docker container resource usage


## 📄 References
- [Roman Numerals - Wikipedia](https://en.wikipedia.org/wiki/Roman_numerals)
- [Adobe React Spectrum](https://react-spectrum.adobe.com/)

---

