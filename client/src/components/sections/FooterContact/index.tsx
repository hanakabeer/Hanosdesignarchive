import { useRef, useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";
import styles from "./styles.module.css";

/* ── stamp image pool ─────────────────────────────────── */
const STAMP_SRCS = Array.from({ length: 9 }, (_, i) => `/images/stamps/${i + 1}.png`);

const SIDE_STICKERS = [
  { id: "l1", src: STAMP_SRCS[0], side: "left", top: "10%", inset: "3.5%", rotate: -8, scale: 1.12 },
  { id: "l2", src: STAMP_SRCS[3], side: "left", top: "25%", inset: "8.5%", rotate: 7, scale: 1.02 },
  { id: "l3", src: STAMP_SRCS[5], side: "left", top: "42%", inset: "4.5%", rotate: -5, scale: 1.16 },
  { id: "l4", src: STAMP_SRCS[7], side: "left", top: "59%", inset: "9.5%", rotate: 9, scale: 1.05 },
  { id: "l5", src: STAMP_SRCS[1], side: "left", top: "77%", inset: "4%", rotate: -6, scale: 1.14 },
  { id: "l6", src: STAMP_SRCS[8], side: "left", top: "92%", inset: "8%", rotate: 5, scale: 0.98 },
  { id: "r1", src: STAMP_SRCS[2], side: "right", top: "12%", inset: "4%", rotate: 6, scale: 1.1 },
  { id: "r2", src: STAMP_SRCS[6], side: "right", top: "29%", inset: "9%", rotate: -7, scale: 1.04 },
  { id: "r3", src: STAMP_SRCS[4], side: "right", top: "46%", inset: "4.5%", rotate: 8, scale: 1.18 },
  { id: "r4", src: STAMP_SRCS[1], side: "right", top: "63%", inset: "10%", rotate: -4, scale: 1.06 },
  { id: "r5", src: STAMP_SRCS[7], side: "right", top: "80%", inset: "4%", rotate: 7, scale: 1.12 },
  { id: "r6", src: STAMP_SRCS[3], side: "right", top: "95%", inset: "8.5%", rotate: -6, scale: 1.02 },
] as const;

const MOBILE_TOP_STICKERS = [STAMP_SRCS[0], STAMP_SRCS[3], STAMP_SRCS[5], STAMP_SRCS[7]] as const;
const MOBILE_BOTTOM_STICKERS = [STAMP_SRCS[2], STAMP_SRCS[6], STAMP_SRCS[4], STAMP_SRCS[1]] as const;

interface StampInstance {
  id: number;
  src: string;
  x: number;      // px from left of container
  y: number;      // px from top of container
  rotate: number;
  scale: number;
}

let uid = 0;

/* minimum px distance between consecutive stamps */
const MIN_DIST = 118;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 253 253" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M114.248 0.575712C183.725 -6.03249 245.372 45.0091 251.843 114.498C258.313 183.988 207.149 245.534 137.647 251.866C68.3402 258.181 7.00423 207.192 0.551891 137.897C-5.90045 68.6025 44.9665 7.16575 114.248 0.575712Z" fill="#FEFEFE" fillOpacity="0.2"/>
      <path d="M130.477 52.0061C139.633 51.9112 156.561 51.4951 164.828 53.1555C171.206 54.4164 177.224 57.0802 182.447 60.9514C191.836 68.0037 198.025 78.51 199.642 90.1409C201.097 100.278 201.031 155.507 199.178 164.707C197.862 171.253 195.078 177.416 191.038 182.732C182.455 193.982 172.032 198.332 158.453 200.098C140.047 200.342 121.581 200.048 103.17 200.21C97.5226 200.26 91.9527 200.111 86.4203 198.855C79.8321 197.356 73.6776 194.358 68.437 190.093C43.4505 169.85 54.7979 134.292 52.184 106.364C49.5041 77.7361 65.1876 54.3428 95.1567 52.1565C106.233 51.737 119.277 52.1227 130.477 52.0061ZM150.521 65.9358C132.008 66.4502 112.707 65.2383 94.2768 66.1418C85.1902 67.5253 78.0578 70.4367 72.352 78.1487C69.5969 81.8969 67.7252 86.2194 66.8774 90.7932C65.5227 98.0753 65.6411 154.833 66.8481 161.618C68.3048 169.412 72.7848 176.313 79.312 180.814C91.9629 189.683 118.829 185.202 134.042 186.204C140.699 186.643 152.41 186.34 159.16 185.976C168.107 184.472 175.202 181.053 180.583 173.339C183.218 169.528 184.969 165.176 185.706 160.602C186.824 153.987 186.708 96.2351 185.495 90.1838C183.867 82.3873 179.23 75.5477 172.59 71.1497C166.323 66.9369 157.938 65.7295 150.521 65.9358Z" fill="white"/>
      <path d="M124.729 89.7228C144.725 88.5808 161.898 103.784 163.188 123.771C164.479 143.757 149.405 161.042 129.429 162.483C109.24 163.938 91.7316 148.669 90.4267 128.47C89.1224 108.271 104.521 90.8766 124.729 89.7228ZM149.726 121.912C147.415 109.32 135.377 100.951 122.769 103.17C110.03 105.413 101.556 117.601 103.891 130.322C106.225 143.043 118.474 151.429 131.178 149.003C143.754 146.602 152.036 134.505 149.726 121.912Z" fill="white"/>
      <path d="M164.467 78.5822C169.113 78.09 173.314 81.3619 173.976 85.9867C174.637 90.6109 171.52 94.9298 166.923 95.7589C163.796 96.3226 160.611 95.1337 158.619 92.6593C156.627 90.1843 156.146 86.8187 157.365 83.8849C158.583 80.9511 161.307 78.9173 164.467 78.5822Z" fill="white"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 253 253" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M114.648 0.540046C184.204 -5.86484 245.734 45.4428 251.939 115.015C258.138 184.595 206.646 245.972 137.054 251.966C67.7517 257.942 6.68119 206.714 0.505994 137.427C-5.66862 68.1391 45.3806 6.91798 114.648 0.540046Z" fill="#FEFEFE" fillOpacity="0.2"/>
      <path d="M154.099 101.246C188.875 97.9364 189.677 121.63 189.291 148.46C189.138 159.206 189.279 170.55 189.291 181.343L164.828 181.355C164.863 169.642 166.937 135.247 161.459 126.927C159.83 124.448 157.345 122.433 154.357 121.952C150.39 121.302 145.474 123.329 142.263 125.491C134.834 135.042 137.441 167.644 137.447 181.349L112.937 181.343L112.966 102.79L136.556 102.784L136.679 113.157C142.07 105.788 145.72 103.715 154.099 101.246Z" fill="white"/>
      <path d="M73.3398 102.789L97.7008 102.785L97.692 181.349L73.341 181.36L73.3398 102.789Z" fill="white"/>
      <path d="M83.4402 63.8442C88.4921 63.0912 93.5588 65.1151 96.7017 69.1416C99.8441 73.1682 100.578 78.5741 98.6207 83.2926C96.6636 88.0106 92.3195 91.3106 87.2494 91.9305C79.5513 92.8721 72.5265 87.4522 71.4847 79.767C70.4423 72.0824 75.7697 64.9873 83.4402 63.8442Z" fill="white"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 253 253" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M114.946 0.5114C184.514 -5.72122 245.915 45.7393 251.938 115.326C257.956 184.912 206.311 246.155 136.707 251.967C67.4028 257.756 6.477 206.375 0.476996 137.088C-5.51714 67.7975 45.6763 6.71706 114.946 0.5114Z" fill="#FEFEFE" fillOpacity="0.2"/>
      <path d="M128.417 50.9169C132.284 50.6204 137.898 50.9612 141.729 51.4891C160.93 54.1804 178.279 64.3848 189.963 79.8593C201.652 95.4357 206.581 115.063 203.634 134.31C200.716 153.341 190.362 170.433 174.847 181.83C157.843 194.375 139.081 197.867 118.509 194.662C110.259 193.068 104.985 190.801 97.4619 187.232C84.4777 190.408 70.8719 194.252 57.9111 197.726C61.5732 184.965 64.9883 171.5 68.4512 158.639C63.6642 148.602 60.8584 141.459 59.7686 130.209C57.9054 110.788 63.9689 91.4351 76.5781 76.5477C90.125 60.4591 107.739 52.5792 128.417 50.9169ZM131.827 64.6571C130.532 64.6671 127.134 64.7569 125.915 64.9403C109.579 66.9788 95.9033 74.1586 85.6377 87.2225C76.0753 99.4375 71.7511 114.951 73.6201 130.349C74.8623 140.68 78.0147 147.658 83.3291 156.383L77.4756 178.308L99.4072 172.379C109.069 177.863 116.429 181.226 127.743 181.994C145.468 182.199 159.642 178.344 172.796 165.652C184.192 154.607 190.644 139.431 190.69 123.564C190.714 107.764 184.397 92.6169 173.165 81.5106C162.191 70.597 147.302 64.5283 131.827 64.6571Z" fill="white"/>
      <path d="M105.893 90.6251C114.788 89.3893 118.057 97.095 120.014 104.801C121.256 109.693 117.413 113.627 114.501 117.324C120.987 129.09 128.856 135.143 141.049 140.117C142.936 137.739 145.743 132.629 148.315 131.457C154.508 128.627 164.575 135.184 166.913 140.973C167.721 142.977 166.462 145.631 165.665 147.401C144.167 177.629 72.401 112.42 105.893 90.6251Z" fill="white"/>
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg viewBox="0 0 253 253" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M114.946 0.5114C184.514 -5.72122 245.915 45.7393 251.938 115.326C257.956 184.912 206.311 246.155 136.707 251.967C67.4028 257.756 6.477 206.375 0.476996 137.088C-5.51714 67.7975 45.6763 6.71706 114.946 0.5114Z" fill="#FEFEFE" fillOpacity="0.2"/>
      <path d="M50.3286 74.0775L83.2965 74.0861C97.5445 74.0864 115.688 72.2768 125.247 85.2331C132.141 94.5758 132.094 111.951 122.093 119.268C120.536 120.407 118.797 121.319 117.22 122.469C118.785 123.179 120.303 123.873 121.806 124.697C133.691 131.208 135.685 147.537 130.94 159.111C130.313 160.64 129.585 162.004 128.743 163.46C119.528 178.364 105.208 178.136 89.681 178.352C81.6248 178.438 73.5679 178.439 65.5117 178.358C59.961 178.309 53.616 178.636 48.125 178.281C47.8927 174.688 48.055 169.818 48.0566 166.148L48.0635 143.813L48.0528 74.1608C48.7589 74.1066 49.6099 74.1012 50.3286 74.0775ZM71.8442 160.386C75.9813 160.58 81.0189 160.57 85.1523 160.478C92.2861 160.32 101.999 161.695 107.691 156.588C109.298 154.964 110.347 153.384 110.973 151.146C112.258 146.552 112.134 139.981 108.517 136.448C103.597 131.641 95.2464 132.366 88.8968 132.369C85.1782 132.347 81.4594 132.348 77.7408 132.373C76.6082 132.385 72.7761 132.498 71.877 132.369C71.7424 136.066 71.8262 140.221 71.8374 143.947L71.8442 160.386ZM71.8155 115.253L85.7402 115.266C90.329 115.274 97.3582 115.611 101.556 114.277C105.97 112.974 108.65 110.796 109.337 106.059C110.584 97.4655 106.908 93.1202 98.3454 92.332C91.8878 91.7374 85.6326 91.9575 79.1769 91.9445L71.8532 92.0465L71.8441 106.61C71.8483 109.362 71.923 112.521 71.8155 115.253Z" fill="white"/>
      <path d="M178.372 98.5066C179.547 98.4899 181.105 98.5854 182.286 98.6772C191.649 99.4048 200.299 102.513 206.504 109.781C213.287 117.724 215.661 126.936 215.643 137.204C215.639 139.154 215.783 141.199 215.643 143.142C214.024 143.24 212.058 143.184 210.408 143.191C206.571 143.214 202.735 143.212 198.897 143.185L161.306 143.253C161.206 149.01 163.196 155.095 168.044 158.534C175.007 163.474 186.656 163.678 192.636 157.015C193.475 156.079 194.306 154.579 195.066 153.508C196.826 153.393 198.866 153.462 200.652 153.45L211.793 153.403L214.706 153.505C213.464 158.886 211.499 162.241 207.792 166.354C194.089 181.56 166.706 180.911 152.078 167.423C144.594 160.591 142.523 151.397 141.906 141.751C140.706 123.023 148.239 104.964 167.677 99.8741C171.464 98.8825 174.452 98.6814 178.372 98.5066ZM161.673 130.508L180.197 130.516C185.3 130.515 190.575 130.453 195.668 130.576C195.572 120.689 188.463 114.277 178.739 114.378C178.333 114.383 177.929 114.39 177.523 114.401C167.605 114.878 163.013 121.176 161.673 130.508Z" fill="white"/>
      <path d="M157.655 78.4389C159.528 78.4008 161.503 78.4078 163.378 78.4397C175.369 78.6436 187.534 78.1512 199.505 78.4736C199.481 81.8805 199.538 85.1521 199.459 88.5803C194.557 88.7044 189.309 88.6094 184.387 88.6052L157.59 88.6307C157.651 85.2381 157.581 81.8413 157.655 78.4389Z" fill="white"/>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9 9.75C9 8.09315 10.3431 6.75 12 6.75H16.25C17.9069 6.75 19.25 8.09315 19.25 9.75V16C19.25 17.6569 17.9069 19 16.25 19H12C10.3431 19 9 17.6569 9 16V9.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 14.25V8C5 6.34315 6.34315 5 8 5H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CONTACT_EMAIL = "kabeer.hana@hotmail.com";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/hano.archives?igsh=YjJqaTBsdGw5eHg0&utm_source=qr",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.linkedin.com/in/hana-kabeer-3015972b1",
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://wa.me/971529901551",
    label: "WhatsApp",
    Icon: WhatsAppIcon,
  },
  {
    href: "https://www.behance.net/hanakabeer",
    label: "Behance",
    Icon: BehanceIcon,
  },
] as const;

export function FooterContact() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [stamps, setStamps] = useState<StampInstance[]>([]);
  const [hinted, setHinted] = useState(false);
  const stampIndexRef = useRef(0); // cycles through stamps in order

  const addStamp = useCallback((clientX: number, clientY: number) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // throttle by distance
    if (lastPos.current) {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) return;
    }
    lastPos.current = { x, y };

    // cycle through stamps in order, with slight randomisation
    const idx = stampIndexRef.current % STAMP_SRCS.length;
    stampIndexRef.current += 1;

    const newStamp: StampInstance = {
      id: uid++,
      src: STAMP_SRCS[idx],
      x: x,
      y: y,
      rotate: (Math.random() - 0.5) * 10,
      scale: 0.95 + Math.random() * 0.65,
    };

    if (!hinted) setHinted(true);
    setStamps(prev => [...prev, newStamp]);
  }, [hinted]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    addStamp(e.clientX, e.clientY);
  }, [addStamp]);

  /* touch support */
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const t = e.touches[0];
    addStamp(t.clientX, t.clientY);
  }, [addStamp]);

  /* clear on double-click */
  const handleDoubleClick = useCallback(() => {
    setStamps([]);
    lastPos.current = null;
    stampIndexRef.current = 0;
    setHinted(false);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      toast({ title: "Email copied", description: CONTACT_EMAIL });
    } catch {
      toast({ title: "Copy failed", description: "Please copy the email manually.", variant: "destructive" });
    }
  }, []);

  return (
    <footer id="contact" className={styles.footer}>
      {/* ── interactive stamp canvas ── */}
      <div
        ref={canvasRef}
        className={styles.stampCanvas}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onDoubleClick={handleDoubleClick}
      >
        <div className={styles.stickerColumns} aria-hidden="true">
          {SIDE_STICKERS.map((sticker) => (
            <div
              key={sticker.id}
              className={`${styles.columnSticker} ${
                sticker.side === "left" ? styles.columnStickerLeft : styles.columnStickerRight
              }`}
              style={{
                top: sticker.top,
                transform: `translateY(-50%) rotate(${sticker.rotate}deg) scale(${sticker.scale})`,
                ...(sticker.side === "left" ? { left: sticker.inset } : { right: sticker.inset }),
              }}
            >
              <img src={sticker.src} alt="" draggable={false} />
            </div>
          ))}
        </div>

        <div className={styles.canvasHeading}>
          <div className={styles.mobileStickerLine} aria-hidden="true">
            <span className={styles.mobileStickerRule} />
            {MOBILE_TOP_STICKERS.map((src, index) => (
              <span key={`top-${index}`} className={styles.mobileSticker}>
                <img src={src} alt="" draggable={false} />
              </span>
            ))}
            <span className={styles.mobileStickerRule} />
          </div>
          <div className={styles.kicker}>Archive Is Open For New Conversations</div>
          <h2 className={styles.thanks}>Let&apos;s Connect</h2>

          <div className={styles.envelopeWrap} aria-hidden="true">
            <div className={styles.envelopeHalo} />
            <img src="/images/envelop.png" alt="" className={styles.envelopeImage} draggable={false} />
          </div>

          <div className={styles.directContact}>
            <button type="button" className={styles.emailPill} onClick={handleCopyEmail}>
              <span className={styles.emailText}>{CONTACT_EMAIL}</span>
              <span className={styles.copyBadge}>
                <CopyIcon />
              </span>
              <span className={styles.srOnly}>Copy {CONTACT_EMAIL}</span>
            </button>
            <div className={styles.inlineSocials}>
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className={styles.socialIcon}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className={`${styles.mobileStickerLine} ${styles.mobileStickerLineBottom}`} aria-hidden="true">
            <span className={styles.mobileStickerRule} />
            {MOBILE_BOTTOM_STICKERS.map((src, index) => (
              <span key={`bottom-${index}`} className={styles.mobileSticker}>
                <img src={src} alt="" draggable={false} />
              </span>
            ))}
            <span className={styles.mobileStickerRule} />
          </div>

          <p className={`${styles.canvasHint} ${hinted ? styles.canvasHintHidden : ""}`}>
            <span className={styles.desktopHint}>Move your cursor to leave a mark &nbsp;·&nbsp; double-click to clear</span>
            <span className={styles.mobileHint}>Tap to place stamps and leave a mark &nbsp;·&nbsp; double-tap to clear</span>
          </p>
        </div>

        {/* stamps */}
        {stamps.map(stamp => (
          <div
            key={stamp.id}
            className={styles.stampItem}
            style={{
              left: `${stamp.x}px`,
              top: `${stamp.y}px`,
              transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg) scale(${stamp.scale})`,
            }}
          >
            <img src={stamp.src} alt="" draggable={false} />
          </div>
        ))}

      </div>

      {/* ── footer bottom bar ── */}
      <div className={styles.footerBottom}>
        <div className={styles.contactList}>
          <span className={styles.label}>Contact Me</span>
          <div className={styles.socials}>
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className={styles.socialIcon}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.signature}>
          <span className={styles.regards}>Thank you for stopping by.</span>
          <div className={styles.signImg}>Hano</div>
        </div>
      </div>
    </footer>
  );
}
