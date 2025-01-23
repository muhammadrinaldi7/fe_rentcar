import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
export interface PromoCardProps {
  code: string;
  desc: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
}
export const PromoCard = (props: PromoCardProps) => {
  return (
    <Card className="text-info-600 rounded-tr-none hover:drop-shadow-lg hover:shadow-primary-400">
      <CardHeader className="pb-0 mb-0">
        <CardTitle className="text-xl">{props.desc}</CardTitle>
        <CardDescription>
          Priode: {props.startDate} - {props.endDate}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-row gap-4 w-full text-sm justify-between">
          <p>Promo Code :</p>
          <p>{props.code}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
