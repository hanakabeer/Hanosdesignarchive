export const PROJECT_REGISTRY = [
  { id: 1, route: "/work/1", title: "Mumo", tag: "Adaptive Menstrual Care" },
  { id: 2, route: "/work/2", title: "Cascader", tag: "Rotomolding Machine" },
  { id: 3, route: "/work/3", title: "Mycrochet", tag: "Robotic Biocomposite Fabrication System" },
  { id: 4, route: "/work/4", title: "VersaGrip", tag: "Adaptive Grip Exploration" },
  { id: 5, route: "/work/5", title: "Pencil Sharpener", tag: "Reverse Engineering Study" },
  { id: 6, route: "/work/6", title: "Bukhoorie", tag: "A Ritual Lighting Experience" },
] as const;

export function getProjectIndexById(id: number) {
  return PROJECT_REGISTRY.findIndex((project) => project.id === id);
}
