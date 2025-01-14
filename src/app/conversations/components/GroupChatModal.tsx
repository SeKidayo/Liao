"use client";

import Input from "@/components/input/Input";
import Modal from "@/components/modal/Modal";
import Select from "@/components/select/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    axios.post('/api/conversions', {
      ...data,
      igGroup: true,
    }).then(() => {
      // TODO
      onClose();
    }).catch(() => {
      toast.error('Failed to create group chat');
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-600">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with multiple people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Group Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                label="Members"
                disabled={isLoading}
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                onChange={(value) => setValue('members', value, {
                  shouldValidate: true,
                })}
                value={members}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default GroupChatModal;
