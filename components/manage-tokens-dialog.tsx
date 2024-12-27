import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

export default function ManageTokensDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="w-full">
          Manage Tokens
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-md flex-col justify-center sm:h-fit">
        {/* TODO: Implement manage tokens dialog */}
        {/* <button className='absolute left-3 top-4'>
          <BiLeftArrowAlt
            style={{ width: '1.3rem', height: '1.3rem' }}
            className='text-muted-foreground/70 hover:text-muted-foreground'
          />
        </button> */}
        <DialogHeader>
          <DialogTitle>Manage Tokens</DialogTitle>
          <DialogDescription>
            Manage token lists or tokens you import
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="tokens">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lists" disabled>
              Lists
            </TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>
          <TabsContent value="lists">Coming Soon</TabsContent>
          <TabsContent value="tokens" className="mt-5 space-y-5">
            <Input placeholder="Search by address" className="text-sm" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
