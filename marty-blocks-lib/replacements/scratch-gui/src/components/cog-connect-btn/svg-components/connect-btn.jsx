import React from "react";
import styles from "./styles.css";

class ConnectBtnSVG extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles.button}>
        <svg id="Layer_2" dataName="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="-6 0 20.18 22.26">
          <defs>
            <style>{`
              .cls-1 {
                fill: #a2d5e2;
      }

              .cls-1, .cls-2 {
                stroke: #fff;
              stroke-miterlimit: 10;
              stroke-width: .25px;
      }

              .cls-2 {
                fill: #71888e;
      }

              .cls-3 {
                fill: #fff;
              stroke-width: 0px;
      }`}
            </style>
          </defs>
          <g id="Layer_1-2" dataName="Layer 1">
            <g>
              <g>
                <rect className="cls-1" x="2.61" y="12.68" width="5.5" height="10.05" rx="2.75" ry="2.75" transform="translate(23.06 12.34) rotate(90)" />
                <circle className="cls-2" cx="2.89" cy="17.7" r="2.77" />
                <rect className="cls-2" x=".81" y=".13" width="8.89" height="13.6" rx="4.45" ry="4.45" />
                <path className="cls-3" d="M4.88,11.39v-4.18c-.48.47-.95.93-1.41,1.38-.16-.16-.32-.31-.49-.47.6-.58,1.18-1.16,1.78-1.74-.59-.6-1.18-1.19-1.77-1.78.16-.16.31-.32.47-.48.47.47.95.93,1.42,1.4V1.58s0,0,.01,0c.88,1.01,1.75,2.03,2.64,3.05-.6.59-1.2,1.18-1.81,1.77.6.6,1.2,1.21,1.8,1.81-.88,1.06-1.75,2.12-2.64,3.19ZM5.55,9.51s0,0,.01.01c0,0,0-.02,0-.02.34-.41.67-.82,1.01-1.22.03-.03.01-.05,0-.07-.33-.33-.66-.66-.99-1,0,0-.02-.02-.03-.03v2.32ZM5.56,3.37v2.24c.35-.35.7-.69,1.05-1.03-.35-.4-.69-.8-1.05-1.21Z" />
              </g>
            </g>
          </g>
        </svg>
        <div className={styles.buttonTitle}>Connect</div>
      </div>
    );
  }
}

export default ConnectBtnSVG;
