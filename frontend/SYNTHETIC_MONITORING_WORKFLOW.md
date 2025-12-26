# Synthetic Monitoring System - Product & Workflow Documentation

## 1. OVERVIEW

### What is Synthetic Monitoring?
Synthetic Monitoring is a proactive monitoring technology that simulates user interactions with a website or application. Instead of waiting for real users to report issues, the system essentially acts as a "robot user" that visits your website at regular intervals to check if it is working correctly.

### Why it is used
It is used to ensure high availability, performance, and functionality of web services. It helps IT and DevOps teams detect outages and performance bottlenecks before they impact actual customers.

### Key Benefits
*   **Proactive Issue Detection:** Identify downtime or slow loading times immediately.
*   **Performance Benchmarking:** Track response times over time.
*   **Global Visibility:** Test how your site performs from different geographical locations (e.g., India, Europe, US).
*   **SLA Compliance:** Verify if uptime guarantees (e.g., 99.9%) are being met.

---

## 2. USER ENTRY & DASHBOARD FLOW

### Initial View
*   **New User:** Upon logging in for the first time or if no monitors exist, the user sees a "Hero Section" and an "Empty State" illustration. This clear, welcoming interface encourages the user to "Add Monitoring."
*   **Returning User:** If monitors exist, the interface automatically swaps the empty state for a comprehensive **Usage Dashboard**, displaying high-level statistics and a list of active monitors.

### Navigation
The dashboard is part of the main application layout, accessible via the side navigation menu under "Synthetic Monitoring."

### Add Monitoring
The primary call-to-action is the **"+ Add Monitoring"** button. Clicking this initiates the configuration wizard.

---

## 3. ADD MONITORING WORKFLOW (Wizard-Based Flow)

The creation process is streamlined into a 4-step wizard to ensure simplicity and accuracy.

### Step 1: Monitoring Type Selection
*   **Selection:** Users choose between **HTTP** (standard web traffic) and **HTTPS** (secure web traffic).
*   **Impact:** This sets the protocol for the synthetic check. Most modern applications should use HTTPS.
*   **Action:** Selecting a card highlights it; clicking "Next" proceeds to configuration.

### Step 2: Configuration
*   **Monitor Name:** A friendly alias for the monitor (e.g., "Production Landing Page").
*   **Site URL:** The exact endpoint to test (e.g., `https://www.example.com`).
*   **HTTP Method:** The monitoring action to perform:
    *   **GET:** Retrieve data (most common for checking if a page loads).
    *   **POST/PUT:** Send data (used to test form submissions or APIs).
    *   **DELETE:** Remove resources (API testing).

### Step 3: Alerts & Locations
*   **Select Location:** Users choose a geographical origin for the test (e.g., **India, Europe, US**). This helps identify regional connectivity issues.
*   **Alert Frequency:** How often the test runs (e.g., every **1 min, 5 min, ... 30 min**). Higher frequency provides more granular data but uses more resources.
*   **Notify To:** The communication channel for alerts (currently defaults to **Email**).
*   **Email Management:** Users can input a primary email address and add multiple secondary recipients using the "+ Add more mail id" link to ensure the whole team is notified.

### Step 4: Summary & Confirmation
*   **Review:** A split-view summary screen displaying:
    *   **Left Card:** Configuration details (Name, URL, Method).
    *   **Right Card:** Alert settings (Location, Frequency, Emails).
*   **Edit Capability:** Each card has an **"Edit"** button, allowing the user to jump back to specific steps if corrections are needed.
*   **Confirmation:** Clicking **"Confirm"** saves the configuration, closes the wizard, and immediately activates the new monitor.

---

## 4. BACKGROUND MONITORING LOGIC

*(Note: Technical execution based on system design)*

*   **Execution:** At the defined interval (e.g., every 5 mins), the backend scheduler triggers a request to the target URL from the selected region.
*   **Uptime Calculation:** Calculated as `(Successful Checks / Total Checks) * 100`.
*   **Response Time:** Measured as the time (in milliseconds) from sending the request to receiving the first byte of response (TTFB).
*   **Downtime Detection:** If a check returns a 4xx/5xx error code or times out, the system marks the state as "Down" and triggers the alert workflow.

---

## 5. DASHBOARD ANALYTICS & VISUALIZATION

The top section of the dashboard provides a high-level health check.

*   **Stats Cards:**
    *   **Active Monitoring:** Total number of configured monitors.
    *   **UP State:** Number of monitors currently passing checks (Green).
    *   **Down State:** Number of monitors currently failing (Red).
*   **Circle (Pie) Chart:** A visual distribution of Up vs. Down states.
    *   **Hover:** Hovering over a slice displays the exact count.
    *   **Interaction:** Clicking a slice (e.g., "Down State") filters the table below to show only the problematic monitors.

---

## 6. MONITORING TABLE DETAILS

The main workspace is a detailed table listing all monitors.

### Columns
*   **Status Icon:** Visual indicator (Green arrow up / Red arrow down).
*   **Site / Name:** The friendly name and the target URL.
*   **Uptime:** Percentage reliability (e.g., "100%", "99%").
*   **Last Run At:** Timestamp of the most recent check.
*   **Alert Frequency:** The configured interval.
*   **Uptime/Downtime Bar:** A visual "barcode" history of the last 20 checks. Green bars indicate success; red bars indicate failure. Hovering shows specific timestamps.
*   **Response Time:** The speed of the site (e.g., "75 ms").
*   **Action:** A three-dot menu for management.

### Features
*   **Filtering:** Use the Filter icon to narrow down results.
*   **Action Menu:** Provides quick access to **Edit** or **Delete** specific monitors.

---

## 7. DETAILED VIEW PAGE

*(Drill-down capability upon clicking a specific row)*

*   **Uptime Graph:** A line or area chart showing availability over time.
*   **Downtime Logs:** A chronological list of outage incidents, including start time, end time, and total duration.
*   **Response Time Graph:** A trend line showing performance latency. Spikes in this graph indicate network congestion or server load.
*   **Usage:** Users analyze these trends to correlate downtime with deployments or peak traffic hours.

---

## 8. EDIT & DELETE WORKFLOWS

### Edit
1.  Click the **Action Menu (⋮)** on a specific row.
2.  Select **Edit**.
3.  The wizard re-opens with pre-filled data.
4.  User updates fields (e.g., changing email recipients or frequency).
5.  Saving updates the monitor without losing historical data.

### Delete
1.  Click the **Action Menu (⋮)**.
2.  Select **Delete**.
3.  The monitor is immediately removed from the dashboard.
4.  *Safety Note:* Deletion is permanent and removes associated historical logs.

---

## 9. REPORTING & EXPORT

Located in the table header, the **Print** and **Download** icons facilitate external reporting.

### Export Modal
*   **Customization:** Users can choose specific data columns to include (e.g., only "Site Name" and "Uptime").
*   **Formats:**
    *   **Excel:** For raw data analysis and custom graphing.
    *   **PDF:** For formal management reports and SLA presentations.
*   **Print:** Generates a browser-friendly print view of the current table state.

---

## 10. ALERT NOTIFICATION FLOW

1.  **Trigger:** The synthetic agent detects a failure (404, 500, Timeout).
2.  **Verification:** (Optional backend logic) A second check runs immediately to confirm it's not a false positive.
3.  **Notification:** An email is dispatched to the configured recipients.
    *   *Subject:* "Alert: [Monitor Name] is DOWN."
    *   *Body:* Details include timestamp, error code, and location.
4.  **Recovery:** A follow-up email is sent once the site returns to "UP" state.

---

## 11. FUTURE ENHANCEMENTS

*   **AI Insights:** Predictive analysis to warn of potential downtime before it happens based on latency trends.
*   **App Notifications:** Push notifications to a mobile app integration.
*   **Advanced Analytics:** SLA reports comparing performance against competitors.
*   **Multi-Step Scripts:** Ability to simulate complex user flows (e.g., "Login -> Add to Cart -> Checkout") rather than just single URL pings.

---

## 12. END-TO-END WORKFLOW SUMMARY

**Scenario:** A DevOps Engineer needs to monitor a new marketing site.

1.  **Login:** Engineer logs into the portal and sees the dashboard.
2.  **Initiate:** Clicks **"+ Add Monitoring"**.
3.  **Setup:** Selects **HTTPS**, enters `https://marketing-site.com`, selects **US/Europe** locations, and sets frequency to **5 min**.
4.  **Alerts:** Adds `devops-team@company.com` for alerts.
5.  **Confirm:** Reviews the summary and confirms configuration.
6.  **Monitor:** The new site appears in the table with a "Pending" status until the first run completes.
7.  **Analyze:** After 24 hours, the engineer exports a **PDF Report** to show management that the new site has maintained **100% Uptime**.
