import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const PromoCard = () => {
  return (
    <Card className="text-info-600 rounded-tr-none hover:drop-shadow-lg hover:shadow-primary-400">
      <CardHeader className="pb-0 mb-0">
        <CardTitle className="text-2xl">Promo</CardTitle>
        <CardDescription>Priode: 25 Januari - 25 Februari</CardDescription>
      </CardHeader>
      <CardContent className="text-lg py-0 my-0">
        <p>Minimal Sewa 1 Hari</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-4 w-full text-sm justify-between">
          <p>Promo Code :</p>
          <p>PRX002</p>
        </div>
      </CardFooter>
    </Card>
  );
};
