# Water Drop Shop Website

A user-friendly website for ordering water bottles, hosted on GitHub Pages. Customers can place orders, use their location, mark orders as delivered, and view shop details. Orders are sent to the shopkeeper via Formspree. Admin page is accessible via index.html.

## Features
- App-like interface with order form and about section.
- Geolocation for address input.
- Customers can mark orders as delivered (local to their browser).
- Orders sent to shopkeeper via Formspree email/dashboard.
- Admin page for order management instructions.

## Setup
1. Ensure Formspree is set up with the endpoint `https://formspree.io/f/mwpneowl`.
2. Update `index.html` with the shopkeeper's contact details in the About section.
3. Push files to GitHub Pages (main branch, root folder).
4. Access at `https://<your-username>.github.io/water-plant-shop/`.

## Notes
- Orders are sent to the shopkeeper's Formspree account (check email or dashboard).
- Delivery status is local to the customer's browser. For real-time status, add a backend (e.g., Node.js on Heroku).
- Formspree free tier allows 50 submissions/month.
