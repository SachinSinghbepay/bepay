import React from 'react';
import IgpsHero from '@/components/igps/igpsHero';
import GlobalNetworkCoverage from '@/components/igps/globeNetwork';
import ImageComparisonTable from '@/components/igps/comparison';
import App from '@/components/igps/transfer';
import BepayLanding from '@/components/igps/chooseBepay';
import ComplianceSection from '@/components/igps/compliance';
import FAQSection from '@/components/igps/faqs';
import PaymentSystemUI from '@/components/igps/paymentSystem';
import SetupGlobalAccount from '@/components/igps/globalAccount';
import VerticalScrollingSection from '@/components/igps/verticalScroll';
import BuiltForMerchants from '@/components/igps/builtForMerchants';

const IgpsPage = () => {
  return (
    <div>
      <IgpsHero />
      <BuiltForMerchants/>
      <GlobalNetworkCoverage/>
      <ImageComparisonTable/>
      {/* <App/> */}
      <PaymentSystemUI/>
      <BepayLanding/>
      {/* <VerticalScrollingSection/> */}
      <SetupGlobalAccount/>
      <ComplianceSection/>
      <FAQSection/>
    </div>
  );
};

export default IgpsPage;
