# AgentWallet

**A spending-control layer for AI agents that pay with PayPal.**

AgentWallet is an open-source MCP server that sits between any AI agent and PayPal. It enforces budgets, policies, anomaly checks, and human approval before money moves.

> Built for the "Build What's Next with PayPal and AI" hackathon.

## The Problem

AI agents are starting to buy, pay, and refund on our behalf, but nobody trusts them with real money. A single prompt injection or hallucinated purchase can drain an account. AgentWallet makes agent payments safe by default.

## How It Works

```
AI Agent  -->  AgentWallet (MCP server)  -->  PayPal API (sandbox)
                  |
                  |-- Policy engine (budgets, allowlists, velocity limits)
                  |-- AI anomaly scorer (intent vs. request)
                  |-- Approval flow (human approve/deny)
                  `-- Audit log + dashboard
```

1. The agent calls an MCP tool such as `create_payment`.
2. AgentWallet evaluates the request against policies.
3. An LLM scores the request for intent mismatch and injection signs.
4. Verdict: **allow**, **block**, or **require approval**.
5. Allowed payments execute through PayPal. Every decision is logged with reasoning and the PayPal transaction ID.

## Features

- **MCP tools:** `create_payment`, `request_approval`, `refund`, `get_spend_report`
- **Policy engine:**
  - Per-agent daily and monthly budgets
  - Merchant and category allowlists
  - Velocity limits (token bucket + sliding window, Redis-backed)
  - Approval threshold for large payments
- **AI anomaly check:** An LLM compares the user's original intent with the agent's payment request and flags mismatches.
- **Human approval:** Over-limit payments pause until approved or denied via a web page.
- **Audit dashboard:** Decision reasoning, policy verdict, and PayPal transaction ID for every request.

## Tech Stack

- TypeScript, Node.js, Express
- Redis (rate limiting and state)
- PayPal Developer Platform (sandbox): Orders v2, plus Payouts or Invoicing
- Model Context Protocol (MCP) SDK
- LLM of your choice for the anomaly scorer
- Plain HTML or React dashboard

## AI Tools Used

| Tool | How it is used |
|------|----------------|
| LLM (configurable) | Scores each payment request for intent mismatch and prompt-injection risk |
| MCP SDK | Exposes payment tools to any MCP-compatible agent |

## Getting Started

### Prerequisites

- Node.js 20+
- Redis (local or Docker)
- A free [PayPal Developer](https://developer.paypal.com) account with sandbox credentials
- An API key for your chosen LLM provider

### Setup

```bash
git clone https://github.com/<your-username>/agentwallet.git
cd agentwallet
npm install
cp .env.example .env
# fill in your credentials in .env
docker run -d -p 6379:6379 redis
npm run dev
```

### Environment Variables

```env
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_MODE=sandbox
REDIS_URL=redis://localhost:6379
LLM_API_KEY=
LLM_MODEL=
PORT=3000
APPROVAL_BASE_URL=http://localhost:3000
```

### Connect an Agent (MCP)

Add to your MCP client config:

```json
{
  "mcpServers": {
    "agentwallet": {
      "command": "npx",
      "args": ["agentwallet"],
      "env": {
        "PAYPAL_CLIENT_ID": "...",
        "PAYPAL_CLIENT_SECRET": "..."
      }
    }
  }
}
```

## Policy Configuration

Policies live in `policies.json`:

```json
{
  "agents": {
    "shopping-agent": {
      "dailyBudget": 100,
      "monthlyBudget": 500,
      "currency": "USD",
      "allowedMerchants": ["trusted-store.example"],
      "approvalThreshold": 50,
      "velocity": { "maxPerMinute": 3, "maxPerHour": 20 }
    }
  }
}
```

## Demo Scenarios

1. **Within policy:** an agent buys a gift and the PayPal sandbox payment succeeds.
2. **Prompt injection:** a malicious product page tells the agent to pay an attacker. AgentWallet blocks it and logs it.
3. **Human approval:** a large purchase pauses until approved on a phone.
4. **Audit:** the dashboard shows every decision with its reasoning.

## Project Structure

```
src/
  mcp/          # MCP server and tool definitions
  policy/       # Budgets, allowlists, velocity limits
  scoring/      # LLM anomaly scorer
  paypal/       # PayPal API client (sandbox)
  approval/     # Approval flow
  dashboard/    # Audit dashboard
  db/           # Audit log storage
tests/
```

## Testing

```bash
npm test
```

## License

MIT. See [LICENSE](LICENSE).