A migration roadmap, recognising that change at this scale cannot be achieved in one leap. ESco and the technology team should explore and migrate systems forward across the following areas:

| From | To |
| --- | --- |
| Managed infrastructure | Software as a Service (cloud) |
| Stored procedures | An embedded logic model |
| Replicated systems (Myriad per client) | Centralised master |
| Access DB | Power Platform tools |
| SOAP APIs | REST, MS Graph, GraphQL |
| VB.NET / .NET Framework | .NET 5/6 and C# |
| SSRS | Power BI |
| SSIS | Azure Data Factory |
| Customer portals | MS Power Pages |
| SQL Server | Dataverse or Azure SQL |

For Myriad specifically, to remain competitive long-term it should: move the backend to cloud hosting (e.g. Azure SQL); add all its primary keys and clustered indexes; refactor the database design to allow proper customer segmentation; rebuild the front-end with modern web technologies; and upgrade the API from SOAP to REST or GraphQL where appropriate.
