# Delivery Tracker Application

A cross-platform delivery tracking application built with **Expo** and **React Native**, supporting web, iOS, and Android platforms.

## Features

- 📦 **Track Deliveries**: Search and view delivery status by tracking number
- 🗺️ **Route Visualization**: See origin, destination, and current location
- ⏱️ **Real-time Updates**: Track delivery progress with timestamped updates
- 📱 **Cross-Platform**: Works on web, iOS, and Android from a single codebase
- 🎨 **Modern UI**: Clean, intuitive interface with status badges and timeline views

## Tech Stack

- **Framework**: Expo (React Native)
- **Routing**: Expo Router
- **Language**: TypeScript
- **Date Handling**: date-fns
- **Styling**: React Native StyleSheet

## Project Structure

```
delivery-tracker/
├── app/                      # Expo Router pages
│   ├── _layout.tsx          # Root layout with navigation
│   ├── index.tsx            # Home screen with delivery list
│   └── [trackingNumber].tsx # Detailed tracking view
├── components/               # Reusable UI components
│   ├── DeliveryCard.tsx     # Delivery summary card
│   ├── StatusBadge.tsx      # Status indicator badge
│   └── LoadingSpinner.tsx   # Loading indicator
├── data/                     # Mock data and API simulations
│   └── mockData.ts          # Sample delivery data
├── types/                    # TypeScript type definitions
│   └── index.ts             # Core type definitions
└── assets/                   # Images and static files
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your desired platform:
   - **Web**: Press `w` in the terminal or run `npm run web`
   - **iOS Simulator**: Press `i` or run `npm run ios` (macOS only)
   - **Android Emulator**: Press `a` or run `npm run android`
   - **Physical Device**: Scan the QR code with Expo Go app

## Usage

### Tracking a Delivery

1. Enter a tracking number in the search bar (e.g., `TRK1234567890`)
2. View the delivery details including:
   - Current status
   - Origin and destination
   - Estimated delivery date
   - Customer information
   - Complete tracking history

### Sample Tracking Numbers

- `TRK1234567890` - In Transit
- `TRK0987654321` - Out for Delivery
- `TRK1122334455` - Delivered

## Customization

### Adding Real API Integration

Replace the mock data in `data/mockData.ts` with actual API calls:

```typescript
// Example API integration
import axios from 'axios';

export const fetchDelivery = async (trackingNumber: string) => {
  const response = await axios.get(`/api/deliveries/${trackingNumber}`);
  return response.data;
};
```

### Adding Map Integration

The app is set up with `react-native-maps`. To enable map views:

1. Get API keys from Google Maps or Apple Maps
2. Configure in `app.json`
3. Add MapView component to the tracking details page

## Building for Production

### Web
```bash
npx expo export:web
```

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## License

MIT

## Support

For issues and feature requests, please create an issue in the repository.
