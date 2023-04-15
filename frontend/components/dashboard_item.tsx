import React, { useState } from "react";

type ItemProps = {
  item: any;
};

export default function DashboardItem({ item }: ItemProps) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  return (
    <tr className="bg-grey-800 border-b hover:text-black hover:bg-gray-50 ">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
        {item.name}
      </th>
      <td className="px-6 py-4">{item.network}</td>
      <td className="px-6 py-4">{`${item.type}${item.key}`}</td>

      <td className="px-6 py-4">{item.key}</td>
      <td className="px-6 py-4 text-center">
        <button
          className="font-medium text-red-500  hover:underline"
          onClick={handleClick}
          disabled
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
