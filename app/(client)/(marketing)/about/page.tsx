"use client";
import React from "react";
import Image from "next/image";
import {constructMetadata} from "@/lib/utils";
import {siteConfig} from "@/config/site";
import bookImage from "@/public/image/bookCover-splatter.png";
import socialImage from "@/public/image/about/social-stats.png";
import emailImage from "@/public/image/about/email.png";
import Newsletter from "@/app/(client)/(marketing)/newsletter";
export const metadata = constructMetadata({
  title: siteConfig.pages.about.title,
  description: siteConfig.pages.about.description,
});
const Page = () => {
  return (
    <div className="pt-20 ">
      <div
        id="about"
        className=" w-full md:p-20 flex flex-col items-center relative"
      >
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />

        <h1 className="text-xl font-body font-semibold text-center">
          We are Founder Central
        </h1>
        <h1 className="text-3xl font-body font-bold text-center">
          Here’s Our{" "}
          <span className="decoration-theme-blue underline font-body">
            Origin
          </span>{" "}
          Story
        </h1>

        <p className=" text-sm md:text-lg font-body w-[90%] mt-4 md:w-1/2 text-center">
          Founded by a group of ambitious business lovers like yourself, Founder
          Central is the convergence point where the bold voice of new-age media
          meets the insightful world of business.  We recognized the need for a
          platform that speaks directly to a generation hungry for success and
          quick, relatable content. Every day, we share inspiring stories of
          business icons and foster a community where ambitious founders can
          connect and reach their goals. Our content is designed to be
          digestible, engaging, and stripped of pretense, echoing the candid
          conversations that our audience craves.  Join the community at Founder
          Central - where business gets a fresh voice.
        </p>
      </div>
      <svg
        viewBox="0 0 243 236"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto h-50 w-40 hidden md:block"
      >
        <g opacity="0.8" clip-path="url(#clip0_50_969)">
          <path
            d="M31.9721 206.562C31.1759 204.76 31.0365 202.735 31.5781 200.84C32.4699 197.095 33.5601 193.399 34.8442 189.77C37.4261 181.964 40.6165 174.374 44.3859 167.067C44.9385 166.559 45.6215 166.215 46.3585 166.072C47.0956 165.93 47.8578 165.995 48.56 166.26C49.2623 166.526 49.877 166.981 50.3355 167.575C50.794 168.17 51.0783 168.88 51.1567 169.627C50.2341 173.63 48.9637 177.546 47.3599 181.328C45.8156 185.296 43.1636 193.771 41.6477 198.818C41.7188 198.795 41.7943 198.768 41.8643 198.745C42.4059 198.493 44.2187 197.905 45.123 197.621C51.7761 194.655 58.1613 191.121 64.6246 187.767C103.034 167.786 134.658 147.125 165.999 118.06C167.405 116.786 168.918 115.379 170.411 113.954C160.08 118.118 149.808 122.425 139.514 126.68C136.31 127.998 133.097 129.297 129.832 130.454C127.838 131.421 125.587 131.722 123.41 131.312C113.103 127.027 127.188 115.246 130.221 109.885C141.677 95.5351 151.949 80.2786 160.934 64.2654C170.546 46.0238 176.816 26.209 179.446 5.75837C179.473 5.07734 179.666 4.41325 180.008 3.82382C180.351 3.23439 180.832 2.73745 181.41 2.37621C181.988 2.01496 182.645 1.80033 183.325 1.75098C184.005 1.70163 184.686 1.81904 185.31 2.09301C189.59 4.03784 187.047 9.40805 186.869 12.9998C185.343 23.2212 182.816 33.2677 179.321 42.9937C173.024 61.1288 164.102 78.2427 152.839 93.7891C146.485 102.975 139.399 111.649 132.812 120.663C145.691 115.929 161.86 108.273 175.908 103.4C179.476 101.919 186.025 100.636 186.014 106.323C185.244 110.496 181.288 113.311 178.741 116.5C147.612 147.417 111.808 173.238 72.6448 193.014C65.9851 196.78 54.6545 202.013 49.5696 204.087C58.9135 205.997 68.3653 207.334 77.8722 208.092C78.4398 208.125 78.9939 208.278 79.4982 208.541C80.0026 208.803 80.4457 209.169 80.7986 209.615C81.1515 210.061 81.4061 210.576 81.5457 211.127C81.6854 211.678 81.7069 212.253 81.6089 212.813C81.5109 213.373 81.2955 213.905 80.977 214.376C80.6585 214.847 80.244 215.246 79.7607 215.545C79.2775 215.844 78.7363 216.038 78.1728 216.114C77.6094 216.189 77.0363 216.145 76.4912 215.983C65.7308 215.085 55.0199 213.639 44.3901 211.747C41.7771 211.371 39.1936 210.812 36.6586 210.075C34.7037 209.549 33.0259 208.291 31.9721 206.562ZM129.84 130.451L129.832 130.454L129.812 130.461L129.84 130.451ZM130.012 130.387C130.742 130.119 130.893 130.055 130.012 130.387ZM130.012 130.387L129.84 130.451L129.891 130.433L130.012 130.387Z"
            fill="#4DA4E0"
          />
        </g>
        <defs>
          <clipPath id="clip0_50_969">
            <rect
              width="252.316"
              height="85.8345"
              fill="white"
              transform="translate(242.618 62.5332) rotate(136.764)"
            />
          </clipPath>
        </defs>
      </svg>
      <div className="md:container mt-20 md:mt-0">
        <div className="flex flex-col gap-4 md:flex-row items-center md:items-start justify-between container md:pl-20">
          <h1 className="text-3xl leading-[50px] text-center md:text-left md:text-5xl text-black font-head font-bold md:w-1/2 md:leading-[80px]">
            <span className="text-theme-blue relative ">
              Millions
              <svg
                viewBox="0 0 207 83"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute  h-full w-full  -bottom-2 translate-y-1/2"
              >
                <g clip-path="url(#clip0_50_979)">
                  <path
                    d="M119.729 21.846C93.6796 22.7794 65.4116 24.2808 38.626 22.7542C65.4167 18.4598 92.9103 16.9284 119.729 21.846ZM191.94 48.0369C161.996 37.2097 129.677 36.8531 98.2496 34.6732C65.4262 33.5929 31.0192 30.4355 -1.18863e-05 43.4281C30.7492 36.8933 62.5349 37.9685 93.7793 39.1236C124.824 40.5882 157.347 43.1305 189.421 49.6655C193.823 50.52 201.662 52.4391 204.219 52.5537C200.119 51.0654 196.026 49.5598 191.94 48.0369Z"
                    fill="#4DA4E0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_50_979">
                    <rect
                      width="202.147"
                      height="44.2583"
                      fill="white"
                      transform="translate(8.53198 -6.10352e-05) rotate(11.1149)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>{" "}
            watching our daily short video series on social media
          </h1>
          <div className="w-[90%] md:w-[40%] aspect-square relative">
            <Image src={socialImage} alt="logo" fill objectFit="contain" />
          </div>
        </div>
        <div className="w-full h-40  md:mt-20 hidden md:block relative  rotate-90 ">
          <svg
            viewBox="0 0 346 330"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-40 w-32 md:h-60 md:w-60  absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            <g opacity="0.8" clip-path="url(#clip0_50_971)">
              <path
                d="M337.368 231.622C337.478 236.747 333.428 269.729 323.249 282.013C321.033 283.98 318.133 284.997 315.174 284.845C312.215 284.693 309.434 283.385 307.433 281.202C299.543 274.105 291.914 266.724 284.173 259.466C280.624 255.128 273.324 252.125 273.636 245.816C273.805 244.469 274.361 243.199 275.238 242.161C276.115 241.123 277.274 240.361 278.575 239.968C279.876 239.574 281.263 239.566 282.568 239.945C283.873 240.323 285.041 241.071 285.928 242.099C295.128 250.486 303.52 258.969 311.155 265.807C302.388 237.202 291.217 209.388 277.761 182.663C265.066 157.895 254.609 137.348 234.732 123.043C222.408 113.86 207.862 108.116 192.584 106.399C194.606 112.307 195.271 118.596 194.528 124.797C193.786 130.998 191.656 136.953 188.295 142.22C186.992 144.645 185.16 146.747 182.934 148.37C180.709 149.993 178.147 151.095 175.438 151.597C172.729 152.098 169.942 151.984 167.283 151.265C164.625 150.546 162.162 149.239 160.077 147.441C154.279 142.408 150.351 135.569 148.926 128.029C147.649 123.484 147.582 118.685 148.732 114.106C149.881 109.527 152.206 105.327 155.478 101.92C160.887 97.8672 167.258 95.2898 173.966 94.4412C149.771 63.5074 95.3473 49.6775 56.1301 54.3039C42.0977 55.5843 28.2035 58.0851 14.6054 61.778C14.3514 61.8459 14.101 61.9276 13.8428 61.9771C16.7575 60.9762 12.482 62.4068 9.98229 63.1219C9.17229 63.4491 8.30989 63.6277 7.43652 63.6491C6.68132 63.7188 5.92019 63.6166 5.21028 63.3503C4.50037 63.0839 3.86012 62.6604 3.3376 62.1114C2.64693 61.4634 2.12522 60.6565 1.81782 59.7611C1.51043 58.8656 1.42667 57.9086 1.57381 56.9733C1.72096 56.0379 2.09456 55.1526 2.66213 54.3943C3.2297 53.6359 3.97405 53.0275 4.83048 52.6219C6.73524 51.8834 8.62582 51.0908 10.5607 50.4268C20.1384 46.9841 30.0177 44.4454 40.0689 42.844C77.3652 36.3085 115.774 42.2993 149.294 59.8803C164.426 67.5824 177.26 79.13 186.505 93.3617C210.131 94.2014 232.596 103.796 249.525 120.277C269.162 139.383 280.41 165.077 292.097 189.416C302.873 211.907 311.782 235.244 318.735 259.193C321.188 251.11 323.567 241.326 325.672 234.304C326.741 231.342 326.247 231.949 327.052 230.076C327.319 228.908 327.95 227.855 328.853 227.068C329.657 226.427 330.631 226.037 331.655 225.944C332.678 225.85 333.707 226.059 334.612 226.544C335.518 227.028 336.262 227.768 336.752 228.67C337.242 229.573 337.456 230.599 337.368 231.622ZM181.602 106.291C178.901 106.518 176.217 106.913 173.565 107.474C164.226 109.492 161.711 112.2 160.372 119.773C159.823 128.828 166.242 140.21 171.813 140.466C180.005 143.055 189.006 122.055 181.602 106.291Z"
                fill="#4DA4E0"
              />
            </g>
            <defs>
              <clipPath id="clip0_50_971">
                <rect
                  width="303.37"
                  height="283.954"
                  fill="white"
                  transform="matrix(0.986618 -0.163048 -0.163048 -0.986618 46.2981 329.618)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex mt-10 md:mt-0 items-center flex-col md:flex-row justify-between gap-20 container">
          <div className="w-[90%] md:w-[40%] aspect-square relative order-2 md:order-1">
            <Image src={bookImage} alt="logo" fill objectFit="contain" />
          </div>

          <h1 className="text-3xl leading-[50px] md:text-5xl text-center md:text-left text-black font-head font-bold md:w-1/3  md:leading-[80px] order-1 md:order-2">
            <span className="text-theme-blue relative ">
              Hundreds
              <svg
                viewBox="0 0 256 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 translate-y-1/2  h-full w-full "
              >
                <g clip-path="url(#clip0_50_981)">
                  <path
                    d="M253.289 51.8054C250.641 51.3732 246.801 50.5633 243.649 50.1153C192.785 43.286 141.474 39.9887 90.3426 40.2634C65.3532 40.4474 32.8228 42.2473 5.51808 43.948C4.18565 44.1797 2.77652 44.1213 1.44359 43.7793C1.17564 43.6641 0.93733 43.5099 0.742676 43.3257C0.548022 43.1416 0.400946 42.9312 0.310086 42.707C0.219226 42.4828 0.186416 42.2492 0.213583 42.02C0.24075 41.7908 0.327345 41.5706 0.468283 41.3724C1.08877 40.4067 2.69175 40.4191 3.91811 40.154C6.18957 39.7773 8.48204 39.4659 10.7677 39.1312C37.6415 35.0117 64.7187 31.4769 92.2908 30.1805C117.58 28.5517 143.083 28.6869 168.537 28.4879C161.495 27.5941 154.439 26.7975 147.37 26.1626C128.866 24.5898 110.312 24.0089 91.8434 24.4242C88.2331 24.7626 84.6256 25.1119 81.0209 25.4722C74.0991 26.1461 67.161 26.7465 60.228 27.3721C55.9417 27.5254 51.5073 28.7071 47.2268 27.8407C44.4864 26.788 45.547 24.5401 47.858 23.9191C54.1627 22.3502 60.9844 22.0451 67.6109 21.5198C75.9652 21.0128 84.3497 20.6834 92.7642 20.5316C99.8647 19.8662 106.973 19.239 114.101 18.7247C100.391 18.4437 86.7768 18.4137 73.3183 18.7643C103.788 13.2744 135.765 15.1939 167.161 17.0074C168.872 17.0261 170.585 17.1921 172.269 17.5025C172.618 17.6059 172.939 17.7653 173.208 17.9699C173.478 18.1744 173.69 18.4193 173.83 18.6876C173.97 18.9558 174.035 19.2412 174.02 19.5241C174.005 19.807 173.91 20.0807 173.743 20.3264C172.465 22.0163 169.285 21.0514 167.123 21.2331C159.075 21.0986 154.418 21.0832 146.859 21.1613C143.122 21.2052 139.394 21.3094 135.671 21.4384C152.503 22.4981 171.414 24.415 185.425 27.2545C185.766 27.3438 186.084 27.484 186.36 27.6669C186.637 27.8498 186.866 28.0717 187.034 28.3194C187.202 28.5672 187.305 28.8358 187.339 29.1093C187.372 29.3828 187.334 29.6558 187.228 29.912C186.277 31.5055 183.516 31.3985 181.511 31.5355C179.337 31.5909 176.092 31.7294 172.491 31.789C146.543 32.0038 123.045 31.5988 96.9061 33.1571C77.5929 34.0543 58.4123 35.7539 39.4468 38.2488C51.3534 37.6223 63.2771 37.1165 75.218 36.7315C108.641 35.9983 142.201 36.8434 175.713 39.2621C199.84 41.0762 224.354 42.8466 247.407 49.9018C249.383 50.5045 251.33 51.1683 253.289 51.8054Z"
                    fill="#4DA4E0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_50_981">
                    <rect
                      width="252.762"
                      height="43.8803"
                      fill="white"
                      transform="translate(4.50464 0.140747) rotate(5.86596)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>{" "}
            reading the ‘50 Greatest Business Success Stories’ every day.
          </h1>
        </div>
        <div className="w-full h-40  relative  hidden md:block">
          <svg
            viewBox="0 0 413 305"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-32 w-20 md:h-40 md:w-60 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            <g opacity="0.8" clip-path="url(#clip0_50_973)">
              <path
                d="M63.9659 294.704C91.1248 290.199 117.76 282.983 144.719 277.444C148.963 276.549 153.206 275.652 157.448 274.752C156.921 274.853 155.735 274.999 155.546 275.056C157.199 275.004 158.791 274.415 160.081 273.378C161.37 272.341 162.287 270.913 162.693 269.309C164.124 258.165 152.894 259.748 145.318 261.001C148.499 260.46 130.565 263.265 137.583 262.193C120.455 265.196 92.3267 271.516 75.4744 274.985C81.8769 266.827 88.0707 258.506 94.2407 250.171C111.662 226.128 123.28 211.208 139.567 186.32C150.867 169.073 158.715 155.842 167.707 157.178C180.504 159.284 223.046 186.282 250.724 189.99C272.952 189.726 265.367 161.54 266.801 146.907C266.323 105.444 264.851 56.8106 284.114 40.6372C298.589 31.0098 328.213 27.4795 351.483 22.9087C353.355 22.3046 354.965 21.0809 356.048 19.4391C357.131 17.7973 357.623 15.8355 357.442 13.877C357.261 11.9184 356.418 10.08 355.052 8.66476C353.686 7.2495 351.879 6.34183 349.928 6.09134C333.581 8.26412 317.396 11.5161 301.479 15.8261C285.595 19.3875 270.12 26.7439 262.776 42.1078C242.494 81.6678 253.8 128.267 249.761 170.949C249.668 171.404 249.558 171.967 249.453 172.546C239.383 170.54 211.292 157.089 191.048 147.863C178.623 141.828 160.19 134.37 145.408 150.982C136.21 161.81 127.886 173.351 120.515 185.496C108.823 202.429 94.8688 220.977 79.5679 241.56C78.007 243.643 76.4146 245.701 74.8432 247.775C75.8235 232.138 75.5992 216.449 74.1722 200.847C73.674 199.277 72.703 197.9 71.392 196.904C70.081 195.908 68.4941 195.341 66.8486 195.281C65.203 195.221 63.5792 195.672 62.1993 196.57C60.8194 197.469 59.751 198.772 59.1401 200.301C58.2585 214.505 59.0447 229.289 57.7477 243.675C57.4086 252.534 56.0422 267.752 55.4318 273.655C55.0519 274.681 54.9383 275.787 55.1016 276.869C54.4344 283.009 51.2411 293.801 63.9659 294.704Z"
                fill="#4DA4E0"
              />
            </g>
            <defs>
              <clipPath id="clip0_50_973">
                <rect
                  width="369"
                  height="207"
                  fill="white"
                  transform="matrix(-0.957996 0.286782 0.286782 0.957996 353.5 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex items-center  flex-col md:flex-row justify-between container md:pl-20 mt-10">
          <h1 className="text-3xl text-center md:text-left md:text-5xl leading-[50px] text-black font-head font-bold w-[90%] md:w-1/2 md:leading-[80px]">
            <span className="text-theme-blue relative ">
              Thousands
              <svg
                viewBox="0 0 309 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-1 translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full "
              >
                <g clip-path="url(#clip0_50_983)">
                  <path
                    d="M309 13.4285C264.809 13.3691 218.89 11.8661 174.141 12.7833C150.475 13.2716 126.875 14.4012 103.332 15.7996C86.8569 16.5372 70.3192 18.1635 53.7938 17.9867C52.9283 17.9022 52.134 17.6672 51.526 17.3158C50.9181 16.9644 50.5281 16.5149 50.4127 16.0324C50.2973 15.5499 50.4625 15.0597 50.8843 14.6327C51.3061 14.2058 51.9625 13.8643 52.7584 13.658C61.6739 12.1897 71.1388 11.7932 80.255 10.7391C98.9766 8.86786 117.784 7.23286 136.465 5.23834C90.679 7.41413 42.262 11.4321 0 14.6766C31.5952 8.85302 73.1771 5.05478 109.061 2.84003C120.391 2.09083 131.742 1.43624 143.097 0.813871C150.826 0.592226 158.726 -0.461089 166.42 0.234046C169.209 0.676056 171.665 2.70044 169.531 4.12346C166.48 5.9026 161.798 6.40394 157.672 7.04515C148.091 8.22391 138.456 9.24696 128.8 10.2072C135.854 9.84513 142.915 9.5214 149.989 9.28766C203.026 7.31833 256.733 7.57499 309 13.4285Z"
                    fill="#4DA4E0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_50_983">
                    <rect width="309" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>{" "}
            subscribed to weekly newsletter where founders connect with founders
          </h1>
          <div className="w-[90%] md:w-[40%] aspect-square relative">
            <Image src={emailImage} alt="logo" fill objectFit="contain" />
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default Page;
