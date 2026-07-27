import QRCode from "qrcode";

// QR code rendu côté serveur : le module `qrcode` ne part jamais dans le
// navigateur, seule la balise <svg> finale est envoyée. Le motif suit donc
// l'URL enregistrée depuis /admin, sans image à regénérer à la main.
//
// Fond CLAIR et modules sombres : un QR inversé (clair sur nuit) reste
// illisible pour une partie des appareils photo. La couleur de marque est
// donc apportée par le cadre et la pastille, pas par les modules.
export default async function LinkedInQr({
  url,
  size = 168,
}: {
  url: string;
  size?: number;
}) {
  let svg: string;
  try {
    svg = await QRCode.toString(url, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 1,
      width: size,
      color: { dark: "#071522", light: "#ffffff" },
    });
  } catch {
    return null;
  }

  return (
    <div
      className="inline-flex rounded-2xl bg-gradient-to-br from-brand-sky via-brand-teal to-brand-emerald p-[3px]"
      aria-hidden="true"
    >
      <div
        className="overflow-hidden rounded-[13px] bg-white p-2 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
