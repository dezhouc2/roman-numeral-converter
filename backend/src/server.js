/**
 * Express.js API server for Roman numeral conversion with complete observability:logs, metrics, traces
 */

const express = require('express');
const cors = require('cors');
const { convertToRoman } = require('./romanConverter');

const app = express();
const PORT = process.env.PORT || 8080;

// Simple metrics storage
const metrics = {
  totalRequests: 0,
  successfulConversions: 0,
  errorCount: 0,
  startTime: Date.now()
};

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple tracing middleware
app.use((req, res, next) => {

  req.traceId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  req.startTime = Date.now();
  
  console.log(`[${req.traceId}] ${new Date().toISOString()} - ${req.method} ${req.url}`);
  metrics.totalRequests++;
  
  // Log when request completes
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`[${req.traceId}] Request completed in ${duration}ms - Status: ${res.statusCode}`);
  });
  
  next();
});

// Root endpoint with API information
app.get('/', (req, res) => {
  console.log(`[${req.traceId}] API info requested`);
  
  res.json({
    message: 'Roman Numeral Converter API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      convert: 'GET /romannumeral?query={number}',
      metrics: 'GET /metrics',
      examples: [
        'GET /romannumeral?query=1',
        'GET /romannumeral?query=42',
        'GET /romannumeral?query=1984'
      ]
    },
    frontend: 'For the web interface, run the frontend separately with npm start'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log(`[${req.traceId}] Health check accessed`);
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    traceId: req.traceId
  });
});

// Simple metrics endpoint
app.get('/metrics', (req, res) => {
  console.log(`[${req.traceId}] Metrics requested`);
  
  const uptime = Date.now() - metrics.startTime;
  
  res.json({
    uptime: Math.floor(uptime / 1000),
    totalRequests: metrics.totalRequests,
    successfulConversions: metrics.successfulConversions,
    errorCount: metrics.errorCount,
    timestamp: new Date().toISOString(),
    traceId: req.traceId
  });
});

// Main Roman numeral conversion endpoint with simple tracing
app.get('/romannumeral', (req, res) => {
  const startTime = Date.now();
  const query = req.query.query;
  
  console.log(`[${req.traceId}] Roman numeral conversion requested for: ${query}`);
  
  try {
    // Validate input
    if (!query) {
      metrics.errorCount++;
      console.log(`[${req.traceId}] ERROR: Missing query parameter`);
      return res.status(400).send('Missing query parameter');
    }

    const num = parseInt(query, 10);
    
    if (isNaN(num)) {
      metrics.errorCount++;
      console.log(`[${req.traceId}] ERROR: Invalid number format - ${query}`);
      return res.status(400).send('Invalid number format');
    }

    if (num < 1 || num > 3999) {
      metrics.errorCount++;
      console.log(`[${req.traceId}] ERROR: Number out of range - ${num}`);
      return res.status(400).send('Number must be between 1 and 3999');
    }

    // Convert to Roman numeral
    const romanNumeral = convertToRoman(num);
    const processingTime = Date.now() - startTime;
    
    metrics.successfulConversions++;
    console.log(`[${req.traceId}] SUCCESS: Converted ${num} to ${romanNumeral} in ${processingTime}ms`);
    
    res.json({
      input: query,
      output: romanNumeral,
      traceId: req.traceId 
    });
    
  } catch (error) {
    metrics.errorCount++;
    console.error(`[${req.traceId}] ERROR: Conversion failed - ${error.message}`);
    res.status(500).send('Internal server error');
  }
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`[${req.traceId}] 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    traceId: req.traceId,
    availableEndpoints: {
      root: 'GET /',
      health: 'GET /health',
      metrics: 'GET /metrics',
      convert: 'GET /romannumeral?query={number}'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  metrics.errorCount++;
  console.error(`[${req.traceId || 'unknown'}] UNHANDLED ERROR: ${err.message}`);
  res.status(500).send('Internal server error');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

module.exports = app;