/*
 * AI CONFIGURATION — code only. None of this is exposed in the app UI.
 *
 * NOTE: anything in a browser-side file can be read by anyone who opens
 * DevTools. For production, send requests through your own small backend
 * and keep the real key there.
 */
const AI_CONFIG = Object.freeze({
  apiKey: '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',                       
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  model: 'liquid/lfm-2.5-2.6b:free',
  temperature: 0.4,
  verseCount: 4,                    // verses returned per search
  timeoutMs: 20000
});
