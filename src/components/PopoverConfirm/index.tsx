import { HelpCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover';
import { PropsWithChildren } from 'react';


const PopoverConfirm = ({ onConfirm }: PropsWithChildren<{ onConfirm?: () => void }>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <X size={15} className='text-red-500 cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent className='w-44'>
        <p className='flex items-center gap-x-2'>
          <HelpCircle size={15} className=' text-red-500' /> 确定要删除吗？
        </p>
        <div className='flex justify-end items-center gap-x-2 mt-4'>
          <PopoverClose asChild>
            <Button type='button' variant='ghost' size='sm' className='h-6'>
              取消
            </Button>
          </PopoverClose>
          <Button type='button' size='sm' className='h-6' onClick={onConfirm}>
            确定
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};


export default PopoverConfirm