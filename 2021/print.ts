export const printResult = ({
  part,
  answer,
}: {
  part: number;
  answer: any;
}) => {
  console.log(`----PART ${part}----`);
  console.log(`Answer: ${answer}\n`);
};
