The recommended architecture has three key components:

1. Maintaining an evolved Myriad core database
2. Phasing out legacy on-premises tools in favour of modern Microsoft development and data manipulation tools and platforms
3. Opening up processes to integrate with other systems

The high-level model:

- **Myriad** - upgraded with a web interface and cloud data management
- **Cloud** - infrastructure and services cloud-based where possible
- **ESco API layer** - abstracted to encompass Myriad API functions and connections to other systems over time
- **ESco tooling** - Access-based on-premises tools upgraded to make use of Azure and Power Platform cloud-based tools
- **Customer touch points** - eCommerce, reporting, and management applications running from cloud SaaS services and / or MS Power Platform tooling

The eCommerce portals are not changed specifically in this model, though ESco should plan to move away from Isle's bespoke CMS over time, decoupling the Myriad / Isle integration into a more flexible architecture.
