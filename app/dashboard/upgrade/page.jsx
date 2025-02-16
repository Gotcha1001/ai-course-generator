// upgrade/page.jsx
"use client";

import FeatureMotionWrapper from "@/app/_components/FramerMotionStuff/FeatureMotionWrapperMap";
import { CreditContext } from "@/app/_context/CreditContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

function BuyCredits() {
    const creditsOption = [
        {
            credits: 5,
            amount: 50, // 50 rand for 5 credits
        },
        {
            credits: 10,
            amount: 100, // 100 rand for 10 credits
        },
        {
            credits: 20,
            amount: 200, // 200 rand for 20 credits
        },
        {
            credits: 50,
            amount: 500, // 500 rand for 50 credits
        },
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    const { userDetail } = useContext(CreditContext);
    const router = useRouter();

    const initiatePayment = async () => {
        if (!selectedOption) {
            toast.error("Please select a credit package");
            return;
        }

        try {
            const response = await fetch("/api/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: selectedOption.amount,
                    credits: selectedOption.credits,
                    userEmail: userDetail.email,
                    itemName: `${selectedOption.credits} Course Credits`,
                }),
            });

            if (!response.ok) {
                toast.error("Failed to initiate payment");
                return;
            }

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Failed to initiate payment");
            }
        } catch (error) {
            toast.error("Error initiating payment");
            console.error(error);
        }
    };

    return (
        <div className="relative">
            <h2 className="font-bold text-4xl gradient-title text-center">
                Buy Course Credits
            </h2>
            <p className="text-white text-center mt-5">
                1 Credit = 1 Course Creation. Each credit costs R10.
                Buy more credits to create amazing courses today!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 mt-10">
                {creditsOption.map((item, index) => (
                    <FeatureMotionWrapper index={index} key={index}>

                        <div

                            className={`flex flex-col gap-2 justify-center items-center ${selectedOption?.credits === item.credits
                                ? "border-2 border-indigo-600 p-1 rounded-lg"
                                : ""
                                }`}
                        >
                            <h2 className="font-bold text-3xl text-yellow-500">
                                {item.credits}
                            </h2>
                            <h2 className="font-medium text-xl text-white">Credits</h2>
                            <Button
                                className="w-full"
                                onClick={() => setSelectedOption(item)}
                            >
                                Select
                            </Button>
                            <h2 className="font-bold text-yellow-500 mb-4">
                                R{item.amount}
                            </h2>
                        </div>

                    </FeatureMotionWrapper>

                ))}
            </div>

            <div className="mt-20 flex justify-center">
                {selectedOption?.amount && (
                    <Button
                        className="w-full md:w-1/2 lg:w-1/3 p-6 bg-green-600 hover:bg-green-700 text-white font-bold"
                        onClick={initiatePayment}
                    >
                        Pay with PayFast
                    </Button>
                )}
            </div>
        </div>
    );
}

export default BuyCredits;