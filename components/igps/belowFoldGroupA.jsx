import GlobalNetworkCoverage from '@/components/igps/globeNetwork';
import ImageComparisonTable from '@/components/igps/comparison';
import PaymentSystemUI from '@/components/igps/paymentSystem';

export default function BelowFoldGroupA() {
  return (
    <>
      <GlobalNetworkCoverage />
      <ImageComparisonTable />
      <PaymentSystemUI />
    </>
  );
}
