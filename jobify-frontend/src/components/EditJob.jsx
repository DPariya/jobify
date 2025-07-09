import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import JobForm from "./JobForm";

const EditJob = ({
  open,
  setOpen,
  formData,
  setFormData,
  handleSubmit,
  isEditing,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <DialogTitle
              as="h3"
              className="text-lg font-semibold leading-6 text-gray-900 mb-4"
            >
              {isEditing ? "Edit Job" : "Create Job"}
            </DialogTitle>

            {/* Job Form */}
            <JobForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditJob;
