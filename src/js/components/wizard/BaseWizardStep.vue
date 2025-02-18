<style>
/* Form Control Base Styles */
:deep(.form-input),
:deep(.form-select),
:deep(.form-textarea) {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem;
  width: 100%;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Placeholder Styles */
:deep(.form-input::placeholder),
:deep(.form-select::placeholder),
:deep(.form-textarea::placeholder) {
  color: var(--text-secondary);
  opacity: 1;
}

/* Focus States */
:deep(.form-input:focus),
:deep(.form-select:focus),
:deep(.form-textarea:focus) {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 1px var(--primary-500);
}

/* Hover States */
:deep(.form-input:hover),
:deep(.form-select:hover),
:deep(.form-textarea:hover) {
  border-color: var(--primary-500);
}
</style> 