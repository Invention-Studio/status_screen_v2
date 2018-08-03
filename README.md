# Invention Studio Status Screen (v2)
The Invention Studio Status Screen is a single-page web application for displaying information in the Invention Studio.

## Design
This project is developed using responsive web design, meaning that it may be displayed on any platform - primarily desktop, tablet, and mobile. However, it is primarily intended for large-format displays (i.e. desktop) as an ambient display with no user interaction.

## Features
This application is broken into three primary features:
- News Display
- Equipment Queues
- Scrolling Information Ticker

### News Display
The News Screen is the primary focus of the application and covers most of the page. This section is set up much like the screen on most news channels, with a text headline and a large panel for content. It is intended to be adaptable and display a number of headlines on a loop such as social media feeds, information about the Invention Studio, and PI information cards.

**For now, the only display that has been implemented is "Who's On Duty?", which displays a card for each PI who has a shift scheduled at the current time. Additional displays may be added in the future.**

### Equipment Queues
The Equipment Queues display is the secondary focus of the application, covering another large section of the page. This section is set up to display the queue entries for one equipment group at a time, rotating every 15 seconds.

### Scrolling Information Ticker
The Scrolling Information Ticker is the last feature of the application, displaying portions of text that scroll across the screen much like the scrolling headlines at the bottom of many news channels.

**For now, the content for this section is hard-coded, but in the future, this content may be pulled from an external data source.**

## Data Source
The data source for this application is based on the `status` controller of the Invention Studio API, https://is-apps.me.gatech.edu/api. The requests located in this controller simply act as an interface to other 3rd party APIs by offloading authentication and processing logic and returning simple data arrays which can be immediately rendered into the proper display elements on the front end.

### News Display - "Who's On Duty"
The data for the "Who's On Duty" display is pulled from the `OnNow` endpoint of the Humanity API, https://platform.humanity.com/v2.0/. The `/status/on_duty` endpoint of the Invention Studio API is responsible for pulling this data from the Humanity API by authenticating with OAuth2, initiating the request, then processing the information into a simple data array which only includes the necessary information.

### Equipment Queues
The data for the Equipment Queues display is pulled from the `equipmentGroup_queueUsers` endpoint of the SUMS API, https://sums.gatech.edu/SUMSAPI/rest/API. The `/status/queues` endpoint of the Invention Studio API is responsible for pulling this data from the SUMS API by initiating the request with the proper parameters and authentication headers, then processing the information into a simple data array which only includes the necessary information.
