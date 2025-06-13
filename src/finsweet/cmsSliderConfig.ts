declare global {
  interface Window {
    fsAttributes: any[];
  }
}

export const initFinsweetCmsSlider = () => {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsSlider',
    (instances: any[]) => {
      const cmsSlider = instances[0];
      if (cmsSlider) {
        cmsSlider.setConfig({
          autoHeight: true,
        });
      }
    },
  ]);
};
