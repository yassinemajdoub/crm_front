import React, { useEffect } from 'react';
import { useLeadsStore } from '@/stores/leadsStore';
import { fetchStagesAndStatuses } from '../../(removed)/leads/utils/fetchLeads';
import { Combobox, ComboBoxResponsive } from '../../(removed)/leads/_components/ComboBox';

interface ComboBoxResponsiveProps {

  selectedStatus: Combobox | null;
}

export default function StatusIndetailLead({selectedStatus }: ComboBoxResponsiveProps) {
  const setStatuses = useLeadsStore((state) => state.setStatuses);

  useEffect(() => {
    const loadStagesAndStatuses = async () => {
      const { statuses, error } = await fetchStagesAndStatuses();

      if (!error) {
        setStatuses(statuses); // Update the store with statuses
      } else {
        console.error("Error fetching stages and statuses:", error);
      }
    };

    loadStagesAndStatuses();
  }, [setStatuses]);
  const statuesList = useLeadsStore((state) => state.statuses);

  return (
    <ComboBoxResponsive defaultname={"+ Choose Status"} statuses={statuesList} selectedStatus={selectedStatus}   />
  );
}
