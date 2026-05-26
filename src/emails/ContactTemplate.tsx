import {
	Body,
	Column,
	Container,
	Font,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

interface ContactTemplateProps {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const ContactTemplate = ({
	name,
	email,
	subject,
	message,
}: ContactTemplateProps) => {
	const previewText = `New Transmission Protocol: ${subject} from ${name}`;

	return (
		<Html>
			<Head>
				<Font
					fontFamily="Geist"
					fallbackFontFamily="sans-serif"
					webFont={{
						url: "https://fonts.gstatic.com/s/geist/v1/nwpctL211q8_R_i06_M.woff2",
						format: "woff2",
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
				<style>
					{`
            @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600&family=Geist+Mono:wght@400;600&display=swap');
            @font-face {
              font-family: 'Satoshi';
              src: url('https://aurorys-labs.com/fonts/Satoshi-Variable.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
          `}
				</style>
			</Head>
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-[#0a0a0a] my-auto mx-auto font-sans text-white px-2 mt-8">
					<Container className="border border-solid border-[#262626] rounded-xl mx-auto overflow-hidden max-w-[600px] bg-[#111111] shadow-2xl">
						{/* macOS Window Header */}
						<Section className="bg-[#1a1a1a] border-b border-solid border-[#262626] px-4 py-3 w-full">
							<Row>
								<Column align="left" style={{ width: "80px" }}>
									<div className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block mr-2" />
									<div className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block mr-2" />
									<div className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
								</Column>
								<Column align="center">
									<Text className="text-[#8b8b8b] text-[12px] m-0 font-mono tracking-tight text-center">
										secure_uplink@aurorys-labs
									</Text>
								</Column>
								<Column align="right" style={{ width: "80px" }}>
									<Text className="text-emerald-500/80 text-[10px] m-0 font-mono tracking-tight text-right">
										TLS 1.3
									</Text>
								</Column>
							</Row>
						</Section>

						{/* Content Area */}
						<Section className="px-[32px] pt-[32px] pb-[16px]">
							{/* Logo / Title Area */}
							<Section className="mb-0 mt-0 w-full text-center">
								<Row align="center" className="w-full">
									<Column
										align="right"
										className="pr-4"
										style={{ width: "45%" }}
									>
										<svg
											width="48"
											height="48"
											viewBox="0 0 3507 2480"
											xmlns="http://www.w3.org/2000/svg"
											style={{
												fillRule: "evenodd",
												clipRule: "evenodd",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeMiterlimit: 1.5,
											}}
										>
											<g id="Rocket">
												<path
													id="Rocket-Curve-Main-Body"
													d="M1398.154,1468.564c224.457,-758.402 764.97,-1166.61 1507.3,-1351.203c-59.42,651.668 -353.221,1272.235 -1124.493,1713.132"
													fill="none"
													stroke="currentColor"
													strokeWidth="45px"
												/>
												<path
													id="Rocket-Top-Curve"
													d="M2373.981,306.659c161.593,98.669 305.165,216.176 425.513,357.96"
													fill="none"
													stroke="currentColor"
													strokeWidth="45px"
												/>
												<g id="Left-Wing-Logo">
													<path
														d="M1624.612,958.636l-370.011,75.612l-334.955,458.444c154.998,-61.931 331.866,-72.577 478.508,-24.129"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M1400.6,1468.308l-145.998,-434.06"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M1627.811,958.636l-86.105,654.699"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M1469.93,1709.85l-119.627,-96.515c-5.1,-25.593 0.39,-60.418 47.851,-144.772l143.552,144.772"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
												</g>
												<g id="Right-Wing-Logo">
													<path
														d="M2205.22,1531.271c14.947,179.739 23.531,332.436 6.398,419.865l-430.657,386.058c68.085,-177.596 65.256,-346.136 0,-506.701"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M2211.617,1951.136l-430.657,-120.643"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M2202.021,1531.271l-591.737,141.8"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M1612.296,1672.989l168.665,157.504c0,0 -36.675,19.347 -81.059,35.292c-20.732,7.448 -62.494,12.965 -62.494,12.965l-119.627,-120.643"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
												</g>
												<path
													id="Rocket-curve-Middle-Bottom"
													d="M1924.513,1251.406c-151.38,88.774 -274.433,210.875 -379.723,353.878c-62.352,84.686 -118.475,176.702 -170.561,273.467c227.464,-168.775 414.602,-374.491 550.284,-627.344Z"
													fill="none"
													stroke="currentColor"
													strokeWidth="45px"
												/>
												<path
													id="Flame-Logo"
													d="M1087.124,1951.136c38.411,-157.534 136.84,-247.087 239.254,-241.286c-42.748,28.646 -71.596,65.834 -71.776,120.643l71.776,-24.129c-65.32,60.456 -94.686,131.274 -71.776,217.158c67.972,-5.183 148.67,-51.963 191.403,-96.515c3.064,16.058 3.68,32.138 0,48.257c43.16,-7.474 69.902,-39.233 95.702,-72.386c-2.416,112.921 -75.822,221.339 -191.403,265.415c20.49,-39.048 28.113,-79.296 23.925,-120.643c-57.101,84.462 -157.869,137.21 -287.105,168.9c-1.866,-125.785 21.077,-230.064 95.702,-289.544c-31.96,-2.486 -63.863,5.106 -95.702,24.129Z"
													fill="none"
													stroke="currentColor"
													strokeWidth="15px"
												/>
												<ellipse
													id="Rocket-Center-Circle"
													cx="2343.207"
													cy="756.769"
													rx="203.366"
													ry="205.093"
													fill="none"
													stroke="currentColor"
													strokeWidth="45px"
												/>
												<g id="ConstellationLogo">
													<path
														d="M1399.687,1468.698l261.646,-217.292c0,0 -14.719,-131.694 -24.698,-218.633c-4.502,-39.224 -8.039,-69.337 -8.824,-74.137"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M1972.364,720.576l71.776,337.801l-382.806,193.029"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
													<path
														d="M2044.14,1058.377l263.179,241.286"
														fill="none"
														stroke="currentColor"
														strokeWidth="45px"
													/>
												</g>
												<g id="RocketBigStars">
													<path
														d="M904.751,1504.192l-24.751,-11.483l24.751,-11.483l10.437,-27.23l10.437,27.23l24.751,11.483l-24.751,11.483l-10.437,27.23l-10.437,-27.23Z"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<path
														d="M2035.978,1079.728l-42.752,-17.703l42.752,-17.703l18.028,-41.98l18.028,41.98l42.752,17.703l-42.752,17.703l-18.028,41.98l-18.028,-41.98Z"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<path
														d="M1615.265,978.16l-31.501,-12.918l31.501,-12.918l13.284,-30.634l13.284,30.634l31.501,12.918l-31.501,12.918l-13.284,30.634l-13.284,-30.634Z"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<path
														d="M2798.691,671.681l-28.126,-12.918l28.126,-12.918l11.86,-30.634l11.86,30.634l28.126,12.918l-28.126,12.918l-11.86,30.634l-11.86,-30.634Z"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<path
														d="M2883.693,147.385l-42.752,-17.703l42.752,-17.703l18.028,-41.98l18.028,41.98l42.752,17.703l-42.752,17.703l-18.028,41.98l-18.028,-41.98Z"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
												</g>
												<g id="LittleStars-rocket">
													<ellipse
														cx="1670.134"
														cy="1241.074"
														rx="15.995"
														ry="16.13"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<ellipse
														cx="1260.672"
														cy="1037.83"
														rx="15.995"
														ry="16.13"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<ellipse
														cx="2313.118"
														cy="1299.143"
														rx="15.995"
														ry="16.13"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<ellipse
														cx="1964.435"
														cy="721.672"
														rx="15.995"
														ry="16.13"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<ellipse
														cx="2194.758"
														cy="1537.875"
														rx="15.995"
														ry="16.13"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<ellipse
														cx="2201.156"
														cy="1941.137"
														rx="15.995"
														ry="16.13"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
													<ellipse
														cx="2373.898"
														cy="305.505"
														rx="15.995"
														ry="16.13"
														fill="none"
														stroke="currentColor"
														strokeWidth="35px"
													/>
												</g>
											</g>
										</svg>
									</Column>
									<Column align="left" style={{ width: "55%" }}>
										<Heading
											className="text-white text-[24px] font-normal text-left p-0 m-0 tracking-tight"
											style={{
												fontFamily: 'Satoshi, "Arial Black", sans-serif',
											}}
										>
											Aurorys Labs
										</Heading>
									</Column>
								</Row>
								<Hr className="border border-solid border-[#262626] m-0 mt-[16px] mb-[24px] w-full" />
							</Section>

							{/* Greeting */}
							<Text className="text-white text-[16px] leading-[24px] font-semibold m-0 mb-4">
								Hi {name.split(" ")[0]},
							</Text>

							<Text className="text-[#d4d4d4] text-[15px] leading-[24px] m-0 mb-4">
								Thank you for reaching out and initiating a secure protocol with
								Aurorys Labs.
							</Text>
							<Text className="text-[#d4d4d4] text-[15px] leading-[24px] m-0 mb-8">
								This email thread will serve as our primary communication
								channel moving forward. Please feel free to reply directly to
								this email with any additional context, documents, or questions.
							</Text>

							<Hr className="border border-solid border-[#262626] m-0 mb-[24px] w-full" />

							{/* Transmission Details */}
							<Heading className="text-[#8b8b8b] text-[11px] uppercase tracking-widest font-semibold m-0 mb-4">
								Transmission Log Details
							</Heading>

							<Section className="bg-[#161616] rounded-lg border border-solid border-[#262626] p-5 mb-8">
								<Text
									className="text-white text-[14px] leading-[22px] m-0 mb-2 font-mono"
									style={{ fontFamily: "'Geist Mono', monospace" }}
								>
									<span className="text-emerald-500 mr-2">Identity:</span>{" "}
									{name}
								</Text>

								<Text
									className="text-white text-[14px] leading-[22px] m-0 mb-4 font-mono"
									style={{ fontFamily: "'Geist Mono', monospace" }}
								>
									<span className="text-emerald-500 mr-2">Protocol:</span>{" "}
									{subject}
								</Text>

								<Text className="text-[#8b8b8b] text-[11px] uppercase tracking-widest font-semibold m-0 mb-2 mt-4 font-sans">
									Payload Message
								</Text>
								<Text
									className="text-[#a3a3a3] rounded-lg p-2 text-[14px] leading-[24px] m-0 whitespace-pre-wrap pl-3 border-l-2 border-solid border-[#333] font-mono"
									style={{ fontFamily: "'Geist Mono', monospace" }}
								>
									{message}
								</Text>
							</Section>

							{/* Sign Off */}
							<Text className="text-white text-[15px] leading-[24px] m-0 mb-1">
								Best regards,
							</Text>
							<Text
								className="text-emerald-500 text-[16px] font-normal m-0 mb-2 tracking-wide"
								style={{ fontFamily: 'Satoshi, "Arial Black", sans-serif' }}
							>
								Aurorys Labs Team
							</Text>
							<Text className="text-[#737373] text-[13px] leading-[20px] m-0 italic max-w-[85%]">
								We are here to engineer resilient, sovereign infrastructure and
								high-performance digital solutions.
							</Text>
						</Section>

						{/* Footer */}
						<Section className="bg-[#111] px-[32px] pt-[16px] pb-[32px]">
							<Hr className="border border-solid border-[#262626] m-0 mb-[24px] w-full" />
							<Text className="text-[#525252] text-[12px] leading-[20px] text-center m-0 max-w-[90%] mx-auto">
								Your transmission has been securely logged on our servers.
								<span className="text-[#737373]">
									{" "}
									We will process this request and respond within 48 hours,
									barring weekends.
								</span>
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default ContactTemplate;
