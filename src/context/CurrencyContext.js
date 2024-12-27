import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

// Mapping of currency codes to their symbols
const currencySymbols = {
    btc: "₿",
    eth: "Ξ",
    ltc: "Ł",
    bch: "BCH",
    bnb: "BNB",
    eos: "EOS",
    xrp: "XRP",
    xlm: "XLM",
    link: "LINK",
    dot: "DOT",
    yfi: "YFI",
    usd: "$",
    aed: "د.إ",
    ars: "$",
    aud: "A$",
    bdt: "৳",
    bhd: "ب.د",
    bmd: "$",
    brl: "R$",
    cad: "C$",
    chf: "CHF",
    clp: "$",
    cny: "¥",
    czk: "Kč",
    dkk: "kr",
    eur: "€",
    gbp: "£",
    gel: "₾",
    hkd: "HK$",
    huf: "Ft",
    idr: "Rp",
    ils: "₪",
    inr: "₹",
    jpy: "¥",
    krw: "₩",
    kwd: "د.ك",
    lkr: "₨",
    mmk: "K",
    mxn: "$",
    myr: "RM",
    ngn: "₦",
    nok: "kr",
    nzd: "$",
    php: "₱",
    pkr: "Rs",
    pln: "zł",
    rub: "₽",
    sar: "ر.س",
    sek: "kr",
    sgd: "$",
    thb: "฿",
    try: "₺",
    twd: "NT$",
    uah: "₴",
    vef: "Bs",
    vnd: "₫",
    zar: "R",
    xdr: "XDR",
    xag: "XAG",
    xau: "XAU",
    bits: "bits",
    sats: "sats",
};

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem("currency");
        return savedCurrency || "usd";  // Default to 'usd'
    });

    const [currencyOptions, setCurrencyOptions] = useState(() => {
        const savedOptions = localStorage.getItem("currencyOptions");
        return savedOptions ? JSON.parse(savedOptions) : [];
    });

    const fetchCurrencies = async () => {
        try {
            if (currencyOptions.length > 0) return; // Don't fetch again if options are already available

            const response = await axios.get(
                "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
            );
            const fetchedCurrencies = response.data;
            setCurrencyOptions(fetchedCurrencies); // Set the fetched data
            localStorage.setItem("currencyOptions", JSON.stringify(fetchedCurrencies)); // Save to localStorage

        } catch (error) {
            console.error("Error fetching Currency options:", error);
        }
    };

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency);
        localStorage.setItem("currency", newCurrency); // Persist selected currency in localStorage
    };

    const getCurrencySymbol = (currencyCode) => {
        return currencySymbols[currencyCode] || currencyCode.toUpperCase();
    };

    useEffect(() => {
        fetchCurrencies(); // Fetch currency options on component mount
    }, []); 

    return (
        <CurrencyContext.Provider value={{ currency, changeCurrency, currencyOptions, getCurrencySymbol }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);
