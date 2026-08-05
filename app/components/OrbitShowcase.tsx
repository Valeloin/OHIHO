import ServiceScene from "./ServiceScene";

const scenes = [
  { type: "landing" as const, label: "Landing page" },
  { type: "intermediaire" as const, label: "Site vitrine" },
  { type: "refonte" as const, label: "Refonte" },
  { type: "application" as const, label: "Application web" },
];

export default function OrbitShowcase() {
  return (
    <div className="orbit-showcase" aria-hidden="true">
      <div className="orbit-path" />
      <div className="orbit-center">
        <img src="/logo-mark.svg" alt="" />
        <span>OHIHO</span>
      </div>
      {scenes.map((scene, index) => (
        <div className={`orbit-slot orbit-slot-${index + 1}`} key={scene.type}>
          <figure className="orbit-card">
            <figcaption><span>0{index + 1}</span>{scene.label}</figcaption>
            <div><ServiceScene type={scene.type} /></div>
          </figure>
        </div>
      ))}
    </div>
  );
}
