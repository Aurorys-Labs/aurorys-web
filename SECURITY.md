# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

Please report security vulnerabilities to `security@auroryslabs.com`.

We will respond within 48 hours and provide a timeline for resolution.

## Security Measures

- Pre-commit hooks with secret detection (gitleaks)
- Automated vulnerability scanning (Semgrep, Trivy)
- Dependency auditing (bun audit)
- CSP and HSTS headers in production
- No secrets committed to repository
