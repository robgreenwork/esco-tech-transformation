Data processing is bi-directional. The flow works as follows:

1. An event occurs in the CRM (for example, a subscription update).
2. A webhook fires in real time and passes the data to the Crane.
3. The Crane translates and loads the data into the Harbour as a queued item.
4. An independent microservice reads from the queue, performs its specific task (such as fulfilment, reporting, or document generation), and writes the result back to the Harbour.
5. The Crane detects the update and pushes the result back to the CRM.

This replaces the old approach of manual or scheduled polling, where systems were checked periodically rather than updated in real time.
