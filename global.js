export const iconAutoRegister = (appInstance) => {
  const icons = import.meta.glob("./src/components/icons/*.vue", {
    eager: true,
  });
  Object.entries(icons).forEach(([path, component]) => {
    appInstance.component(
      path
        .split("/")
        .pop()
        .replace(/\.\w+$/, ""),
      component.default
    );
  });
};
