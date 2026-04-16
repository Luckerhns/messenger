# TODO: Refactor auth pages with useAuthHook + utils/auth.ts

- [x] 1. Finish useAuthHook.ts (add handleChange using phoneMask, states error/loading/showSuccess, submitAuth(endpoint: string, onSuccess: () => void))
- [x] 2. Clean utils/auth.ts (keep phoneMask, remove handleChangeAuthFields)
- [ ] 3. Refactor login/page.tsx to use hook (remove dupe logic)
- [x] 4. Refactor register/page.tsx to use hook
- [x] 5. Extract shared variants to utils or component (optional - variants still page-local but logic decomposed)
- [x] 6. Test (recommend `cd client && yarn dev`, test login/register)
- [x] 7. Complete refactor

