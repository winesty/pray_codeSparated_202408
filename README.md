# Prayer Bead Counter

A customizable, interactive prayer bead counter implemented in JavaScript.

## Features

- Touch-based counting
- Adjustable bead count with presets and custom input
- Configurable beep intervals
- Character display for each count
- Text input logging
- Settings persistence using localStorage

## Installation

1. Clone the repository:
   git clone [winesty/pray_codeSparated_20240827]

## Usage

1. Counting
- Tap the touch area to increment the count and display characters.
2. Adjusting Bead Count
- Click the bead count selector in the dropdown menu.
- Choose a preset option or enter a custom number.
3. Setting Beep Intervals
- Access the beep selector from the dropdown menu on the far left top.
- Select a preset interval or enter a custom value.
4. Adding Text Entries
- Use the input field to enter text.
- Click the input button to add the entry to the list.
5. Configuration
- The script uses the following configuration options:
  - beadCount: Number of beads (default: 21)
  - beepCount: Interval for beep sound (default: 0)
- These settings are saved in localStorage for persistence across sessions.
6. Code Structure
- The main components of the script include:
  - Event listeners for user interactions
- Functions for updating bead count and beep settings
- LocalStorage usage for saving settings
- DOM manipulation for updating the UI
7. Contributing
- Contributions are welcome. Please fork the repository and create a pull request with your changes.
