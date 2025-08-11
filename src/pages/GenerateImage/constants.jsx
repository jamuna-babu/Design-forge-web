export const WIDGET_TYPE_OPTIONS = [
  {
    value: "banner",
    label: "Banner",
  },
  {
    value: "carousel",
    label: "Carousel",
  },
  {
    value: "card",
    label: "Card",
  },
];

export const DEVICE_TYPE_OPTIONS = [
  {
    value: "mobile",
    label: "Mobile",
  },
  {
    value: "desktop",
    label: "Desktop",
  },
];

export const DIMENSION_OPTIONS = {
  banner: {
    mobile: {
      width: 360,
      height: 120,
    },
    desktop: {
      width: 1024,
      height: 200,
    },
  },
  carousel: {
    mobile: {
      width: 656,
      height: 974,
    },
    desktop: {
      width: 720,
      height: 1072,
    },
  },
  card: {
    mobile: {
      width: 304,
      height: 248,
    },
    desktop: {
      width: 400,
      height: 296,
    },
  },
};

export const getDimensions = (widgetType, deviceType) => {
  return DIMENSION_OPTIONS?.[widgetType]?.[deviceType] || null;
};

export const downloadBase64Image = (base64, filename = "image.png") => {
  const link = document.createElement("a");
  link.href = `data:image/png;base64,${base64}`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
