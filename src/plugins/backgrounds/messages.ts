import { defineMessages } from "react-intl";

// Strings shared across the built-in background settings panels.
export const messages = defineMessages({
  colour: {
    id: "background.colour",
    defaultMessage: "Colour",
    description: "Solid colour background: colour picker label",
  },
  gradientFrom: {
    id: "background.gradient.from",
    defaultMessage: "From Colour",
    description: "Gradient background: start colour",
  },
  gradientTo: {
    id: "background.gradient.to",
    defaultMessage: "To Colour",
    description: "Gradient background: end colour",
  },
  gradientAngle: {
    id: "background.gradient.angle",
    defaultMessage: "Angle (0-360)",
    description: "Gradient background: angle in degrees",
  },
  giphyTag: {
    id: "background.giphy.tag",
    defaultMessage: "Tag",
    description: "Giphy background: search tag",
  },
  giphyTagHint: {
    id: "background.giphy.tagHint",
    defaultMessage: "Separate multiple tags with a comma",
  },
  giphyStretch: {
    id: "background.giphy.stretch",
    defaultMessage: "Stretch to fill screen",
  },
  giphySafeSearch: {
    id: "background.giphy.safeSearch",
    defaultMessage: "Safe Search",
  },
  imageRemove: {
    id: "background.image.remove",
    defaultMessage: "Remove image",
  },
  imageLargeWarning: {
    id: "background.image.largeWarning",
    defaultMessage: "Large images may affect performance.",
  },
  imageNoSync: {
    id: "background.image.noSync",
    defaultMessage: "Images do not sync between devices.",
  },
  unsplashPaused: {
    id: "background.unsplash.paused",
    defaultMessage: "(Paused)",
    description: "Shown when the Unsplash rotation is paused",
  },
  unsplashShowNewPhoto: {
    id: "background.unsplash.showNewPhoto",
    defaultMessage: "Show a new photo",
  },
  unsplashEveryNewTab: {
    id: "background.unsplash.everyNewTab",
    defaultMessage: "Every new tab",
  },
  unsplashEvery5: {
    id: "background.unsplash.every5Minutes",
    defaultMessage: "Every 5 minutes",
  },
  unsplashEvery15: {
    id: "background.unsplash.every15Minutes",
    defaultMessage: "Every 15 minutes",
  },
  unsplashEveryHour: {
    id: "background.unsplash.everyHour",
    defaultMessage: "Every hour",
  },
  unsplashEveryDay: {
    id: "background.unsplash.everyDay",
    defaultMessage: "Every day",
  },
  unsplashEveryWeek: {
    id: "background.unsplash.everyWeek",
    defaultMessage: "Every week",
  },
  unsplashOfficial: {
    id: "background.unsplash.official",
    defaultMessage: "Official Collection",
  },
  unsplashTopic: {
    id: "background.unsplash.topic",
    defaultMessage: "Topic",
  },
  unsplashSearch: {
    id: "background.unsplash.search",
    defaultMessage: "Search",
  },
  unsplashCollection: {
    id: "background.unsplash.collection",
    defaultMessage: "Collection",
  },
  unsplashTags: {
    id: "background.unsplash.tags",
    defaultMessage: "Tags",
  },
  unsplashSearchPlaceholder: {
    id: "background.unsplash.searchPlaceholder",
    defaultMessage: "Try landscapes or animals...",
  },
  unsplashFeatured: {
    id: "background.unsplash.featured",
    defaultMessage: "Only featured images",
  },
  unsplashCollectionPlaceholder: {
    id: "background.unsplash.collectionPlaceholder",
    defaultMessage: "Collection ID number",
  },
});
