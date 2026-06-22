We set up Google Cloud Platform (GCP) and MongoDB cloud environments and designed two core components:

- **The Crane**, a custom ESco integration service to extract, transform, and load data from Myriad via APIs.
- **The Harbour**, a central MongoDB data warehouse to receive and store that data for downstream use.

The intended use case was the Single Customer View product, which uses Orbit (Apteco) to present a consolidated view of subscriber data drawn from multiple sources. The environments were stood up and the architecture designed, but the full SCV proof of concept was not completed before the pivot.
