import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const loading = ({ display, notInModal }: any) => {
    if (!notInModal) {
        return (
            <>
                <Modal
                    open={display}
                    className="bg-transparent border-none shadow-none flex items-center justify-center"
                    sx={{
                        "& > .MuiBackdrop-root": {
                            backdropFilter: "blur(4px)",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                        },
                    }}
                >
                    <>
                    <Box>

                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[30rem] h-auto opacity-100 " viewBox="0 0 200 200">
                        <radialGradient id="a8" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                            <stop offset="0" stopColor="#888888"></stop>
                            <stop offset=".3" stopColor="#888888" stopOpacity=".9"></stop>
                            <stop offset=".6" stopColor="#888888" stopOpacity=".6"></stop>
                            <stop offset=".8" stopColor="#888888" stopOpacity=".3"></stop>
                            <stop offset="1" stopColor="#888888" stopOpacity="0"></stop>
                        </radialGradient>
                        <circle
                            transformOrigin="center"
                            fill="none"
                            stroke="url(#a8)"
                            strokeWidth="11"
                            strokeLinecap="round"
                            strokeDasharray="200 1000"
                            strokeDashoffset="0"
                            cx="100"
                            cy="100"
                            r="70"
                        >
                            <animateTransform
                                type="rotate"
                                attributeName="transform"
                                calcMode="spline"
                                dur="2"
                                values="360;0"
                                keyTimes="0;1"
                                keySplines="0 0 1 1"
                                repeatCount="indefinite"
                            ></animateTransform>
                        </circle>
                        <circle
                            transformOrigin="center"
                            fill="none"
                            opacity=".2"
                            stroke="#888888"
                            strokeWidth="11"
                            strokeLinecap="round"
                            cx="100"
                            cy="100"
                            r="70"
                        ></circle>
                    </svg>
                    </Box>
                    </>
                </Modal>
            </>
        );
    }

    return (
      <div className="w-auto h-auto">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <radialGradient id="a8" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                <stop offset="0" stopColor="#888888"></stop>
                <stop offset=".3" stopColor="#888888" stopOpacity=".9"></stop>
                <stop offset=".6" stopColor="#888888" stopOpacity=".6"></stop>
                <stop offset=".8" stopColor="#888888" stopOpacity=".3"></stop>
                <stop offset="1" stopColor="#888888" stopOpacity="0"></stop>
            </radialGradient>
            <circle
                transformOrigin="center"
                fill="none"
                stroke="url(#a8)"
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray="200 1000"
                strokeDashoffset="0"
                cx="100"
                cy="100"
                r="70"
            >
                <animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="2"
                    values="360;0"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                ></animateTransform>
            </circle>
            <circle
                transformOrigin="center"
                fill="none"
                opacity=".2"
                stroke="#888888"
                strokeWidth="11"
                strokeLinecap="round"
                cx="100"
                cy="100"
                r="70"
            ></circle>
        </svg>
      </div>
    );
};

export default loading;
