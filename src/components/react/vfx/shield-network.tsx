import * as React from "react"
import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

interface ShieldNetworkProps extends SVGProps<SVGSVGElement> {
  strokeWidths?: {
    outerShield?: number;
    middleShield?: number;
    innerShield?: number;
    networkLines?: number;
    networkNodes?: number;
  };
  strokeColor?: string;
  fillColor?: string;
}

const ShieldNetwork = ({ className, strokeWidths, strokeColor, fillColor, style, ...props }: ShieldNetworkProps) => {
  const outerShieldStroke = strokeWidths?.outerShield ?? 4;
  const middleShieldStroke = strokeWidths?.middleShield ?? 4;
  const innerShieldStroke = strokeWidths?.innerShield ?? 4;
  const networkLinesStroke = strokeWidths?.networkLines ?? 3;
  const networkNodesStroke = strokeWidths?.networkNodes ?? 3;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 685 817"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
        ...style
      }}
      className={cn(strokeColor || "stroke-cyan-200 dark:stroke-cyan-700", className)}
      {...props}
    >
      <g id="Shielkd">
        <g id="Shield-shape">
          <g id="Outer-Shield">
            <g id="Left-Outer-Shield">
              <path
                d="M7.979,137c-37.177,490.31 228.995,623.406 332.021,675"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${outerShieldStroke}px`,
                }}
              />
              <path
                d="M10,135c187.74,-8.564 296.2,-98.91 332,-129"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${outerShieldStroke}px`,
                }}
              />
            </g>
            <g id="Right-Outer-Shield">
              <path
                d="M676.467,136c37.177,490.31 -228.995,623.406 -332.021,675"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${outerShieldStroke}px`,
                }}
              />
              <path
                d="M674.446,134c-187.74,-8.564 -296.2,-98.91 -332,-129"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${outerShieldStroke}px`,
                }}
              />
            </g>
          </g>
          <g id="Outer-Shield-Background">
            <path
              d="M10,135c187.74,-8.564 296.2,-98.91 332,-129c35.8,30.09 144.26,120.436 332,129c-37.177,490.31 -228.995,623.406 -332.021,675c-103.026,-51.594 -369.198,-184.69 -331.979,-675Z"
              style={{
                fill: "currentColor",
                fillOpacity: 0.03,
                stroke: "none"
              }}
            />
          </g>
          <g id="Middle-Shield">
            <g>
              <path
                d="M36.672,160.55c-33.952,447.78 209.132,569.331 303.221,616.45"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${middleShieldStroke}px`,
                }}
              />
              <path
                d="M38.518,158.724c171.455,-7.821 270.508,-90.331 303.202,-117.81"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${middleShieldStroke}px`,
                }}
              />
            </g>
            <g>
              <path
                d="M647.175,159.637c33.952,447.78 -209.132,569.331 -303.221,616.45"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${middleShieldStroke}px`,
                }}
              />
              <path
                d="M645.33,157.81c-171.455,-7.821 -270.508,-90.331 -303.202,-117.81"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${middleShieldStroke}px`,
                }}
              />
            </g>
          </g>
          <g id="Inner-Shield-Background">
             <path d="M341.532,74.833 c-29.811,25.056 -120.127,100.289 -276.461,107.42 c-30.958,408.288 190.687,519.118 276.479,562.082 c85.792,-42.964 307.437,-153.794 276.479,-562.082 c-156.334,-7.131 -246.65,-82.364 -276.461,-107.42 Z" fill="currentColor" fillOpacity="0.06" stroke="none" />
          </g>
          <g id="Inner-Shield">
            <g>
              <path
                d="M63.388,183.918c-30.958,408.288 190.687,519.118 276.479,562.082"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${innerShieldStroke}px`,
                }}
              />
              <path
                d="M65.071,182.253c156.334,-7.131 246.65,-82.364 276.461,-107.42"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${innerShieldStroke}px`,
                }}
              />
            </g>
            <g>
              <path
                d="M620.047,183.086c30.958,408.288 -190.687,519.118 -276.479,562.082"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${innerShieldStroke}px`,
                }}
              />
              <path
                d="M618.364,181.42c-156.334,-7.131 -246.65,-82.364 -276.461,-107.42"
                style={{
                  fill: fillColor || "none",
                  stroke: "currentColor",
                  strokeWidth: `${innerShieldStroke}px`,
                }}
              />
            </g>
          </g>
        </g>
        <g id="Shield-network">
          <circle
            cx={508}
            cy={253}
            r={27}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <circle
            cx={337.5}
            cy={124.5}
            r={11.5}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <circle
            cx={314}
            cy={260}
            r={19}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <circle
            cx={157}
            cy={260}
            r={28}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <path
            d="M325,130.325l-145.614,112.857"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M350,130l133,107"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M316.71,239l18.29,-103"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M482,255l-149,3"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M322,279l38,94"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M407,375l82,-100"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M179,279l166,108"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <circle
            cx={115}
            cy={447}
            r={19}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <path
            d="M152,289l-36.367,139.011"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M344,415l-208,27"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M130,462l105,89"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M168,290l80,252"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M277,549l81,-108"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M290,568l160,-15"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M466,529l-63,-87"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M271,594l68,148"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M463,572l-124,170"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M509,282l-25,236"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M422,403l122,-22"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M524,278l34,82"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <path
            d="M185,262l110,-1"
            style={{
              fill: fillColor || "none",
              stroke: "currentColor",
              strokeWidth: `${networkLinesStroke}px`,
            }}
          />
          <circle
            cx={381}
            cy={407}
            r={39}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <circle
            cx={566}
            cy={378}
            r={18}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <circle
            cx={478.5}
            cy={549.5}
            r={26.5}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
          <circle
            cx={260.5}
            cy={567.5}
            r={25.5}
            style={{
              fill: fillColor || "currentColor",
              fillOpacity: fillColor ? 1 : 0.2,
              stroke: "currentColor",
              strokeWidth: `${networkNodesStroke}px`,
            }}
          />
        </g>
      </g>
    </svg>
  )
}

export { ShieldNetwork as ReactComponent };
export default ShieldNetwork;
