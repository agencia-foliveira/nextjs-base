import React from "react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  onSubscribe: () => void;
}

export function PricingCard({
  title,
  description,
  price,
  onSubscribe,
}: PricingCardProps) {
  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mb-4 text-sm text-gray-600">{description}</p>
      <p className="mb-6 text-3xl font-bold text-gray-900">
        {price}
        <span className="text-sm font-normal text-gray-500">/mês</span>
      </p>
      <button
        onClick={onSubscribe}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Assinar agora
      </button>
    </div>
  );
}
