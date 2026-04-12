import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import styles from "./styles.module.css";

function AfterEffectsIcon() {
  return (
    <svg viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="141" height="141" rx="27" fill="white" fillOpacity="0.1" />
      <path d="M46.3689 46.0602C49.7516 45.9684 54.203 45.9835 57.5665 46.0921C59.2297 50.1158 60.836 54.6706 62.3799 58.7779L70.9171 81.477L74.1168 89.9939C74.6096 91.3167 75.4002 93.6572 76 94.8669C71.8897 95.0882 67.1297 94.8946 62.9819 94.9073C62.81 94.0006 62.275 92.4429 61.9805 91.5093C61.3844 89.6317 60.7983 87.7511 60.2221 85.8674C59.5367 85.8039 58.331 85.8319 57.6064 85.8279C53.1837 85.8225 48.1195 85.9609 43.7599 85.8075C42.7168 88.7329 41.8677 91.9294 40.8637 94.8968C36.9917 95.1853 31.9459 94.7599 28 94.9219C28.4278 94.0716 29.182 91.8599 29.5408 90.8917L32.4566 83.0594L42.2705 56.7912L44.8215 49.9283C45.1995 48.9123 45.8789 46.9444 46.3689 46.0602ZM46.6046 76.7444C48.1383 76.6002 50.4946 76.6703 52.0941 76.6752C53.5656 76.6696 55.8847 76.597 57.2862 76.7212C56.5076 74.5735 52.4729 60.7019 51.8209 60.0498L46.6046 76.7444Z" fill="black" />
      <path d="M93.2739 58.0435C93.373 58.0358 93.4722 58.0301 93.5717 58.0265C98.5321 57.8298 102.949 58.6827 106.711 62.0958C110.295 65.3473 111.725 69.9912 111.935 74.6549C112.023 76.6018 111.936 78.591 112 80.5588C111.077 80.6032 109.9 80.6122 108.974 80.5772C102.395 80.3285 95.3635 80.9158 88.8319 80.5716C88.9896 81.1066 89.1444 81.6423 89.3323 82.1722C91.2977 87.7135 98.2988 88.2434 102.889 85.6762C103.983 85.0644 104.798 84.2664 105.694 83.4004C106.595 84.5734 107.921 85.9767 108.918 87.1683L110.94 89.4544C108.512 93.2281 102.843 95.4358 98.4999 95.871C87.9067 96.9789 77.9643 90.8905 77.1082 79.9328C76.2172 68.5266 80.7602 59.1669 93.2739 58.0435ZM88.8458 73.3754L95.2158 73.3828C96.972 73.3796 98.8487 73.3419 100.595 73.3774C100.549 69.1851 99.4225 66.7443 94.5913 66.8925C94.4737 66.8961 94.3561 66.9024 94.2387 66.9114C90.5389 67.2294 89.3544 70.2107 88.8458 73.3754Z" fill="black" />
    </svg>
  );
}

function BlenderIcon() {
  return (
    <svg viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true">
      <rect width="141" height="141" rx="27" fill="white" fillOpacity="0.1" />
      <rect x="28" y="32" width="77" height="77" fill="url(#pattern0_blender)" />
      <defs>
        <pattern id="pattern0_blender" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_blender" transform="scale(0.000976562)" />
        </pattern>
        <image
          id="image0_blender"
          width="1024"
          height="1024"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

function SolidworksIcon() {
  return (
    <svg viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="141" height="141" rx="27" fill="white" fillOpacity="0.1" />
      <path d="M52.0146 47.8154C56.2019 47.7245 61.0387 47.7091 65.2256 47.8164C65.9051 50.6497 67.6661 54.7183 68.6553 57.6123L78.748 86.2051L80.7842 91.9805C81.4258 93.7759 82.3104 95.86 82.5195 97.71C78.9643 97.7988 75.1163 97.7678 71.5557 97.71C70.9452 95.3612 68.3989 88.6321 67.4609 85.9883C67.4129 85.8544 66.8609 85.9023 66.6465 85.9023C61.29 85.9915 55.2102 85.9857 49.8594 85.8838C49.1634 88.6285 47.1533 95.3238 45.9131 97.7295C42.8172 97.7442 39.0562 97.8384 36 97.6738C36.2442 95.7333 38.2681 90.5135 38.9941 88.3574L46.3467 67.0801L49.4561 58.167C50.8781 54.1102 51.6174 52.173 52.0146 47.8154ZM58.583 56.6299C57.1474 61.6455 55.5731 66.5643 54.1416 71.5742C53.7126 73.0751 53.0755 74.8216 52.7441 76.2822L58.9277 76.2773C60.6277 76.2782 62.9298 76.2071 64.5791 76.293C62.8387 69.7497 60.5659 63.3586 58.7598 56.832C58.7397 56.7594 58.6365 56.6758 58.583 56.6299Z" fill="#070B19" />
      <path d="M87.1312 60.0837C90.4493 59.9643 94.6454 59.9746 97.9549 60.1019C98.0506 67.8883 97.9635 75.8343 97.9675 83.6337L97.9736 92.3235C97.974 94.0949 98.0193 96.1965 97.8927 97.9376C94.464 98.0083 90.5807 98.0385 87.1645 97.921C87.0125 96.108 87.0674 93.716 87.0687 91.8605L87.0689 82.487C87.0687 75.3379 86.8784 67.1723 87.1312 60.0837Z" fill="#070B19" />
      <path d="M92.6826 44.0086C95.9846 43.8335 98.8059 46.3634 98.9905 49.6649C99.1752 52.9665 96.6538 55.7951 93.3527 55.9894C90.038 56.1847 87.195 53.6504 87.0095 50.3351C86.8242 47.0197 89.3668 44.1842 92.6826 44.0086Z" fill="#070B19" />
    </svg>
  );
}

function IllustratorIcon() {
  return (
    <svg viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="141" height="141" rx="27" fill="white" fillOpacity="0.1" />
      <path d="M53.5411 35.0499C54.9425 34.8571 57.0605 35.2356 58.2793 35.9638C60.5308 37.309 60.7064 40.2101 60.3829 42.5812C59.3267 50.3232 55.3532 58.5609 51.2782 65.1337L55.8876 68.1985C56.6898 67.3348 57.4519 66.4349 58.1714 65.5015C63.0342 59.235 66.8437 51.3501 66.9074 43.2898C66.9177 41.9948 66.8024 40.7628 66.6387 39.4817C68.2815 40.2264 70.1821 41.8008 71.4853 43.0784C75.3141 46.8317 79.8783 52.7713 80 58.3193C75.5522 63.4106 69.547 67.7109 63.6739 70.9995C62.8118 71.4663 61.1117 72.1904 60.4985 72.8197C63.0011 77.6565 64.6057 84.5821 63.5549 90C59.9919 84.2617 55.9283 79.3714 49.977 75.9446C44.4416 72.7572 37.5292 71.4985 31.303 73.18C30.6457 72.3547 30.1691 71.4681 29.8082 70.4773C28.8456 67.8341 28.6091 64.2291 29.8418 61.6301C30.2798 60.7068 30.9649 59.8803 31.9644 59.5448C33.9293 58.8854 41.6429 61.0416 43.6201 62.0368C45.1888 54.3961 46.501 45.7213 40.5407 39.4824C41.1619 39.0312 42.4229 38.3691 43.1207 38.0395C46.4389 36.4719 49.8705 35.3272 53.5411 35.0499Z" fill="#070B19" />
      <path d="M81.8203 63.1533C82.0807 63.2214 82.3589 63.5056 82.5488 63.6934C83.4978 64.6307 83.2122 65.922 83.4033 67.1436C83.5303 67.9072 83.7489 68.6525 84.0557 69.3633C84.9114 71.3336 86.5209 72.8796 88.5244 73.6553C93.5709 75.5635 97.9068 70.7453 99.5723 71.3809C100.815 72.5737 94.9419 79.6204 93.9482 80.6592C95.2919 81.8271 96.7028 82.2969 98.4844 82.2168C106.014 81.8772 116.604 72.1788 121.431 66.9287C121.364 75.9224 112.769 83.5301 106.301 88.6553C105.214 89.5068 104.123 90.3517 103.026 91.1914C102.269 91.7765 100.921 92.7572 100.365 93.4854C99.8045 94.2211 99.3584 96.1471 98.9863 97.1016C98.0356 99.5388 97.0686 101.97 95.4551 104.056C95.4183 103.636 95.4253 103.248 95.21 102.891C94.8349 102.745 94.5562 103.613 94.1123 103.711C93.1117 104.052 91.9084 101.854 91.7119 101.038C91.0161 98.1471 93.867 97.3793 94.7217 100.89C95.5019 99.4703 95.5992 98.3727 95.3369 96.7812C95.0889 95.8864 94.7585 95.0821 93.9717 94.5088C93.3634 94.0697 92.6019 93.8981 91.8643 94.0352C89.3842 94.4785 89.7281 97.554 90.1328 99.3486L87.1025 97.8467C88.3998 99.7112 89.9027 101.785 90.5898 103.961C91.0265 105.343 90.1277 105.481 89.1035 105.709C88.2401 105.053 87.7158 104.415 86.9746 103.636C86.2726 102.888 85.5387 102.17 84.7773 101.483C79.5845 96.8253 74.6826 94.581 67.999 92.8594C68.7197 90.5983 68.9267 87.8971 68.8613 85.5244C70.2275 88.1278 74.3261 90.118 77.2109 89.252C78.4756 88.8727 78.8287 87.5028 79.415 86.4785C79.9177 85.5973 80.5452 84.794 81.2793 84.0938C83.684 81.8368 86.2857 81.7113 89.3848 81.8057C85.1195 79.7701 81.9398 80.1179 78.6152 83.5439C78.0942 84.0804 77.2821 85.0085 76.5254 84.999C75.231 84.9207 73.9715 83.8586 73.082 83.0283C70.4068 80.5311 69.9096 79.8898 72.5762 77.2246L72.2207 77.2158C69.928 77.1517 67.2301 77.0187 65.5723 75.2656C71.553 72.0467 77.0275 67.966 81.8203 63.1533ZM75.9531 80.0068C75.2008 79.3541 74.85 78.6859 73.7109 78.8496C71.9682 79.5926 72.6379 81.0626 73.7314 82.0068C74.5351 82.7 74.813 83.3346 76.0195 83.2207C77.7925 82.429 77.0587 80.9646 75.9531 80.0068Z" fill="#070B19" />
    </svg>
  );
}

function RhinoIcon() {
  return (
    <svg viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="141" height="141" rx="27" fill="white" fillOpacity="0.1" />
      <path d="M67.4096 34H69.4082C71.3812 34.4294 71.9701 35.0217 73.5109 36.2091L76.3163 38.3703L85.4808 45.4319L95.9768 53.5175C97.9606 55.044 100.574 56.9364 102.387 58.5796C104.381 60.3637 106.128 62.4082 107.579 64.6582C109.508 67.6575 110.85 70.9979 111.531 74.5007C111.674 75.2368 111.742 76.0628 111.85 76.8083C111.89 77.0809 111.926 77.6178 112 77.8485V81.4185L111.991 81.4572C111.85 82.0667 111.789 82.8878 111.698 83.5239C110.474 92.0347 105.176 99.3212 98.0122 103.864C94.3161 106.179 90.2115 107.764 85.9206 108.529C84.9651 108.696 84.0096 108.793 83.0479 108.912C82.8075 108.941 82.2042 108.95 82.025 109H77.6581C77.4659 108.952 76.7875 108.925 76.518 108.895C75.5275 108.786 74.5396 108.65 73.5563 108.488C65.3527 107.058 57.5867 102.363 52.7923 95.5C49.9237 91.3937 47.2871 84.9788 48.1676 79.8658C47.4253 80.4189 46.62 81.1081 45.9005 81.7018L42.9582 84.1176L34.9972 90.6491L32.1841 92.9586C31.5256 93.5023 30.7252 94.1973 30.0254 94.6541C29.315 95.1149 28.5455 95.4775 27.738 95.7311C25.0057 96.6158 21.7141 95.7649 20.4366 93.0126C20.2725 92.659 20.1234 92.0761 20 91.6923V89.8626C20.1766 89.4586 20.2741 88.9662 20.4172 88.5405C21.289 85.9496 23.3037 84.6905 25.3836 83.1514L29.9207 79.786L47.2676 66.9174L52.8975 62.74C53.6093 62.2088 54.8182 61.3762 55.4403 60.8376C54.8845 60.9102 53.8588 60.8889 53.2828 60.891L49.6089 60.9006C45.8011 60.9077 41.9885 60.9124 38.1815 60.9029C36.566 60.8989 35.1268 60.4096 33.9926 59.2166C33.0245 58.188 32.476 56.9346 32.5351 55.512C32.673 52.1991 35.2832 50.2629 38.3642 49.8648C40.1402 49.6354 41.8196 49.7164 43.5871 49.7197L51.4029 49.7283L67.0889 49.7475C69.7586 49.7518 72.595 49.7038 75.2449 49.7717C72.6803 47.7302 70.127 45.6741 67.5857 43.6037C66.9146 43.058 66.2403 42.5162 65.5629 41.9783C64.5406 41.1729 63.1912 40.273 62.8986 38.9284C62.7042 38.0458 62.876 37.1219 63.3743 36.3687C64.2975 34.968 65.8257 34.3166 67.4096 34ZM80.4554 94.5554C86.0989 94.3856 91.3548 92.3396 95.2536 88.1707C98.1973 85.0239 99.9353 80.8604 99.7844 76.5221C99.4237 66.1544 89.8037 59.2023 79.9635 59.3367C68.862 59.5549 58.7612 68.2055 60.8462 79.9045C62.473 89.0329 71.6826 94.6599 80.4554 94.5554Z" fill="black" />
      <path d="M79.285 66.025C79.3774 66.0129 79.459 66.0113 79.5514 66.0079C85.174 65.7972 90.8428 69.8348 90.9972 75.7431C91.0583 78.2592 90.1053 80.6952 88.3508 82.5076C86.4061 84.5431 83.5573 85.918 80.7255 85.99C80.053 86.0022 79.2989 86.0156 78.6343 85.9484C76.5465 85.7218 74.5608 84.9298 72.8943 83.6581C70.8092 82.0523 69.4057 79.8328 69.076 77.207C68.7546 74.7045 69.4607 72.1787 71.0347 70.2008C72.5511 68.3117 74.652 66.9737 77.011 66.3945C77.711 66.2204 78.5736 66.1123 79.285 66.025Z" fill="black" />
    </svg>
  );
}

function Fusion360Icon() {
  return (
    <svg viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="141" height="141" rx="27" fill="white" fillOpacity="0.1" />
      <path d="M37.9383 24.2351C39.1526 23.8091 66.0505 24.0921 69.6095 24.0923L86.1799 24.0786C90.4413 24.0544 94.702 23.9665 98.9638 24.1128C100.066 24.1506 101.015 24.2164 102.036 24.7356C103.332 25.3951 104.14 26.3161 104.65 27.6636C105.395 29.6331 104.547 36.8947 105.022 38.479C107.01 38.4585 109.011 38.416 110.997 38.4988L111 117.988L59.0039 117.932L43.5633 117.969C40.47 117.988 37.4484 118.06 34.3248 117.886C32.5007 117.785 30.484 116.086 30.1527 114.263C29.7151 111.855 30.1033 108.996 29.9759 106.535C30.1016 102.79 29.7646 98.7111 29.9843 95.0091C29.4792 95.0372 23.158 98.4831 22.1661 99.0082L22 33.0443C22.7216 32.725 24.3324 31.7375 25.0822 31.3137L31.0022 28.0124C32.2263 27.3365 37.101 24.8517 37.9383 24.2351Z" fill="#CECECD" />
      <path d="M105.029 38.0295C107.015 38.0088 109.013 37.9661 110.997 38.0493L111 117.988L59.0629 117.931L43.6398 117.968C40.55 117.988 37.5319 118.061 34.4118 117.886C32.5898 117.784 30.5754 116.076 30.2445 114.242C29.8074 111.82 30.1951 108.945 30.0679 106.47C30.1935 102.704 29.8569 98.602 30.0763 94.8791L30.2483 94.5787C31.1836 94.2621 36.579 91.2639 37.93 90.5685C38.8788 90.3736 42.4373 90.4195 43.5224 90.4204L53.9275 90.4346L86.926 90.4364C92.3892 90.436 99.5821 90.6529 104.911 90.3348C105.05 85.3802 104.98 80.2202 104.977 75.2496L104.982 52.4468L104.958 43.0209C104.954 41.8305 104.883 39.0859 105.029 38.0295Z" fill="black" />
      <path d="M81.0632 96.0646C82.1608 95.8089 84.2278 96.3432 85.0968 97.1278C87.1191 98.9233 87.0244 101.801 86.9863 104.348C86.9262 108.366 85.6886 110.575 81.7953 110.976C79.0812 111.227 75.932 109.507 76.0457 106.249C76.2274 101.045 74.6633 96.7392 81.0632 96.0646Z" fill="white" />
      <path d="M80.8783 99.0507C81.2997 98.9612 82.499 98.9122 82.6554 99.6053C83.185 101.953 82.9969 104.956 82.7967 107.381C82.7743 107.652 82.3677 107.758 82.1761 107.845C81.4686 108.002 80.8398 108.195 80.3054 107.554C79.887 106.243 79.9284 101.172 80.2486 99.6149C80.329 99.2244 80.5857 99.1873 80.8783 99.0507Z" fill="black" />
      <path d="M69.065 96C72.5619 96.0485 73.8813 96.637 75 100.145C74.0976 100.102 73.242 100.116 72.3405 100.126C71.3658 99.0762 69.4052 97.5039 68.1044 98.8832C67.3481 99.6851 67.496 100.771 67.5125 101.795C70.3473 101.317 72.0436 100.935 74.4039 102.975C74.8176 104.111 74.9029 104.969 74.9987 106.154C74.6923 108.968 73.4828 110.14 70.842 110.784C67.58 111.579 64.363 110.188 64.0711 106.459C63.9234 104.572 64.0414 102.632 64.1066 100.743C64.1471 99.7433 64.375 98.4697 64.9928 97.6784C66.0061 96.4249 67.5724 96.1339 69.065 96Z" fill="white" />
      <path d="M69.8888 104.003C70.6759 103.972 71.692 104.196 71.8981 105.119C72.2707 106.787 71.5901 107.466 70.3724 107.977C68.1398 108.223 67.39 106.426 68.5224 104.38C68.7276 104.009 69.5056 104.04 69.8888 104.003Z" fill="black" />
      <path d="M56.6378 96.0189C61.3123 95.6926 65.2398 99.6506 60.4308 102.661C62.047 103.771 63.1373 104.799 62.986 107.025C62.6864 111.427 55.2617 112.194 53.0108 109.22C52.5858 108.658 52.1627 107.622 52.248 106.903C52.6331 106.59 53.0199 106.698 53.5976 106.691C54.4449 106.673 55.0529 106.641 55.6888 107.326C57.3675 109.134 60.9763 107.643 59.2145 105.168C58.5775 104.274 56.5953 104.471 55.544 104.521L55.5442 101.881C56.5669 101.856 58.613 101.85 58.8856 100.614C59.337 98.5674 56.1933 97.0838 55.4124 100.16C54.2826 100.103 53.1328 100.126 52 100.134C52.2615 99.3486 52.6202 98.4421 52.9111 97.6552C54.1521 96.5763 55.1238 96.3014 56.6378 96.0189Z" fill="white" />
      <path d="M38 24L37.9645 67.6849L37.9658 82.4293C37.9668 84.8736 38.0663 88.3014 37.9083 90.6894C36.5505 91.383 31.1281 94.3734 30.1881 94.6892L30.0152 94.9888C29.5082 95.017 23.1625 98.4734 22.1667 99L22 32.836C22.7244 32.5158 24.3414 31.5252 25.0941 31.1002L31.037 27.7888C32.2659 27.1108 37.1595 24.6185 38 24Z" fill="#858484" />
      <path d="M61.1434 39.0115C66.9793 39.0998 72.845 38.9603 78.6841 39.0292C80.7509 39.0536 82.8828 39.0669 84.947 39C84.9181 41.2215 84.9358 43.4432 85 45.6641C80.3126 45.4292 75.1839 45.6123 70.4525 45.5826C70.4163 48.5084 70.4176 51.4345 70.4561 54.3601L82.7295 54.3969C82.5582 56.1107 82.7048 59.181 82.7564 60.9417C81.2732 61.2983 72.6453 61.0106 70.4291 61.0107C70.3646 65.9219 70.4593 71.0646 70.469 76C67.3391 75.9444 64.2088 75.9286 61.0786 75.9527C60.911 67.5713 61.1248 58.9721 61.0525 50.5694C61.0362 48.6849 60.9003 40.4031 61.1434 39.0115Z" fill="black" />
    </svg>
  );
}

export default function CV() {
  const [showAllExperience, setShowAllExperience] = useState(false);

  const experiences = [
    {
      role: "User Experience Designer",
      company: "Ibdå",
      type: "Internship",
      period: "May 2025 - Present • 10 mos",
      skills: ["User Experience (UX)", "Figma (Software)", "+2 skills"],
      logo: "/images/cv/ibda_logo.jpg"
    },
    {
      role: "Animation Intern",
      company: "Ibdå",
      type: "Internship",
      period: "Dec 2024 - Jan 2025 • 2 mos",
      location: "Remote",
      skills: ["Blender and Adobe Creative Cloud"],
      logo: "/images/cv/ibda_logo.jpg"
    },
    {
      role: "Product Design Consultancy Internship",
      company: "Longevity Wellness Hub",
      type: "Internship",
      period: "Jun 2024 - Jul 2024 • 2 mos",
      skills: ["Graphic Design and Adobe Creative Cloud"],
      logo: "/images/cv/longevity logo.jpg"
    },
    {
      role: "Graphic Designer",
      company: "UniAthena",
      type: "Internship",
      period: "Apr 2023 - Aug 2023 • 5 mos",
      skills: ["Graphic Design and Adobe Creative Cloud"],
      logo: "/images/cv/uniathena_logo.jpg"
    },
    {
      role: "Interior Designer",
      company: "JK Design International",
      type: "Freelance",
      period: "May 2021 - Jun 2022 • 1 yr 2 mos",
      logo: "/images/cv/jk_design_international_logo.jpg"
    }
  ];

  const education = [
    {
      school: "Dubai Institute of Design and Innovation",
      degree: "Bachelor of Design, Product/Multimedia",
      period: "Sep 2023 – May 2027",
      skills: ["Product Design and 3D Modeling"],
      logo: "/images/cv/DIDI_logo_1280.jpg"
    },
    {
      school: "Delhi private school, Sharjah",
      degree: "AISSCE",
      period: "Apr 2009 – Mar 2023",
      logo: "/images/cv/delhi private school.png"
    }
  ];

  const awards = [
    { 
      title: "Winner in UNIVERSAL DESIGN FOR INCLUSION PROGRAM", 
      issuer: "nationalmssociety", 
      date: "Sep 2025",
      logo: "/images/cv/national multiple sclerosis.png"
    },
    { 
      title: "Kartell X DIDI product redesign contest", 
      issuer: "Kartell", 
      date: "Feb 2025",
      logo: "/images/cv/kartell.png"
    },
    { 
      title: "Third place winner - NSTI Next founder Competion", 
      issuer: "Ministry of Education", 
      date: "Feb 2024",
      logo: "/images/cv/Nsti.jpg"
    },
    { 
      title: "ATLAB 3D Printing Olympiad 2017 - Winner", 
      issuer: "ATLAB® Middle East", 
      date: "Nov 2017",
      logo: "/images/cv/atlabme_logo.jpg"
    },
    { 
      title: "Gulf 3D Printing Olympiad 2016 - Runner up", 
      issuer: "ATLAB® Middle East", 
      date: "Nov 2016",
      logo: "/images/cv/atlabme_logo.jpg"
    }
  ];

  const tools = [
    { name: "Fusion", logo: "/images/cv/tools/Fusion.png" },
    { name: "solidworks", logo: "/images/cv/tools/solidworks.png" },
    { name: "After effects", logo: "/images/cv/tools/After effects.png" },
    { name: "Blender", logo: "/images/cv/tools/Blender.png" },
    { name: "Illustrator", logo: "/images/cv/tools/Illustrator.png" },
    { name: "Rhino", logo: "/images/cv/tools/Rhino.png" },
    { name: "Visual studio", logo: "/images/cv/tools/Visual studio.png" },
  ];

  const featuredExperience = experiences.slice(0, 3);
  const hiddenExperience = experiences.slice(3);

  return (
    <div className={styles.cvPage}>
      <Navbar />
      
      <main className={styles.main}>
        <section className={styles.header}>
          <div className={styles.headerShell}>
            <div className={styles.headerIntro}>
              <p className={styles.kicker}>Profile / Resume</p>
              <h1 className={styles.name}>Hana Kabeer</h1>
              <p className={styles.title}>Industrial Designer exploring tactile products, interfaces, and visual systems through thoughtful design and experimentation.</p>
              <p className={styles.summary}> Creative since childhood, I have always been curious about how things look, work, and feel. That curiosity now shapes my practice across industrial design and UI/UX, where I create experiences guided by adaptability, craft, and intentional thinking.</p>
              <div className={styles.links}>
                <a href="https://www.linkedin.com/in/hana-kabeer-3015972b1" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://www.behance.net/hanakabeer" target="_blank" rel="noreferrer">Behance</a>
              </div>
            </div>

            <div className={styles.headerAside}>
              <div className={styles.avatarFrame}>
                <div className={styles.avatar}>
                  <img src="/images/cv/Profile.png" alt="Hana Kabeer portrait" />
                </div>
              </div>

              <div className={styles.headerMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Discipline</span>
                  <span className={styles.metaValue}>Industrial + UI/UX</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Base</span>
                  <span className={styles.metaValue}>Dubai, UAE</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Focus</span>
                  <span className={styles.metaValue}>Products, interfaces, visual storytelling</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Formation</p>
            <h2 className={styles.sectionTitle}>Education</h2>
          </div>
          <div className={styles.list}>
            {education.map((edu, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLogo}>
                  <img src={edu.logo} alt={edu.school} />
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{edu.school}</h3>
                  <p className={styles.itemSubtitle}>{edu.degree}</p>
                  <p className={styles.itemPeriod}>{edu.period}</p>
                  {edu.skills && (
                    <div className={styles.skills}>
                      <span className={styles.skillIcon}>✦</span>
                      {edu.skills.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Selected practice</p>
            <h2 className={styles.sectionTitle}>Experience</h2>
          </div>
          <div className={styles.list}>
            {featuredExperience.map((exp, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLogo}>
                  <img src={exp.logo} alt={exp.company} />
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{exp.role}</h3>
                  <p className={styles.itemSubtitle}>{exp.company} • {exp.type}</p>
                  <p className={styles.itemPeriod}>{exp.period}</p>
                  {exp.location && <p className={styles.itemLocation}>{exp.location}</p>}
                  {exp.skills && (
                    <div className={styles.skills}>
                      <span className={styles.skillIcon}>✦</span>
                      {exp.skills.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {showAllExperience && hiddenExperience.length > 0 && (
              <div className={styles.moreList}>
                {hiddenExperience.map((exp, i) => (
                  <div key={i} className={`${styles.item} ${styles.itemCompressed}`}>
                    <div className={styles.itemLogo}>
                      <img src={exp.logo} alt={exp.company} />
                    </div>
                    <div className={styles.itemContent}>
                      <h3 className={styles.itemTitle}>{exp.role}</h3>
                      <p className={styles.itemSubtitle}>{exp.company} • {exp.type}</p>
                      <p className={styles.itemPeriod}>{exp.period}</p>
                      {exp.location && <p className={styles.itemLocation}>{exp.location}</p>}
                      {exp.skills && (
                        <div className={styles.skills}>
                          <span className={styles.skillIcon}>✦</span>
                          {exp.skills.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {hiddenExperience.length > 0 && (
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowAllExperience((value) => !value)}
            >
              {showAllExperience ? "View Less Experience" : "View More Experience"}
            </button>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Working system</p>
            <h2 className={styles.sectionTitle}>Toolbox</h2>
          </div>
          <div className={styles.toolGrid}>
            {tools.map((tool, i) => (
              <motion.div 
                key={i} 
                className={styles.toolItem}
                whileHover={{ y: -5 }}
              >
                <div className={styles.toolLogo}>
                  <img src={tool.logo} alt={tool.name} title={tool.name} />
                </div>
                <span className={styles.toolName}>{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>Recognition</p>
            <h2 className={styles.sectionTitle}>Honors & Awards</h2>
          </div>
          <div className={styles.list}>
            {awards.map((award, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.itemLogo}>
                  <img src={award.logo} alt={award.title} />
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{award.title}</h3>
                  <p className={styles.itemSubtitle}>Issued by {award.issuer} • {award.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
