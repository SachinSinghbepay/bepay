import BepayLanding from '@/components/igps/chooseBepay';
import SetupGlobalAccount from '@/components/igps/globalAccount';
import ComplianceSection from '@/components/igps/compliance';
import FAQSection from '@/components/igps/faqs';

export default function BelowFoldGroupB() {
  return (
    <>
      <BepayLanding />
      <SetupGlobalAccount />
      <ComplianceSection />
      <FAQSection />
    </>
  );
}
