import React from 'react';
import { useToasts } from 'react-toast-notifications'

export default function Notification() {

  const { addToast } = useToasts();

  return (
    addToast("O cliente precisa ter pelo menos um endereço cadastrado!", { appearance: 'error' })
  );
}
