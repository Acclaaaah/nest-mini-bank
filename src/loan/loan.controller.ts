import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/entities';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

interface JWTRequest extends Request {
    //refer to jwt-auth.guard.ts validate return
    user?: { userId: number}
}

@Controller('loans')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a loan application' })
    @ApiResponse({ status: 201, description: 'Loan created successfully' })
    @Post()
    create(@Body() createLoanDto: CreateLoanDto, @Request() req: JWTRequest) {
        const userId = req.user.userId;
        return this.loanService.create(createLoanDto, userId);
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin) 
    @Get()
    findAll(@Request() request: JWTRequest) {
        return this.loanService.findAll(request.user?.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.loanService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin)  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
        return this.loanService.update(+id, updateLoanDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin)  
    @Patch(':id/approve')
    approveLoan(@Param('id') id: string) {
        return this.loanService.approveLoan(+id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin) 
    @Patch(':id/reject')
    rejectLoan(@Param('id') id: string) {
        return this.loanService.rejectLoan(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':loanId/repayments')
    makeRepayment(@Param('loanId') loanId: string, @Body() { amount }: { amount: number }) {
        return this.loanService.makeRepayment(+loanId, amount);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':loanId/status')
    getLoanStatusAndHistory(@Param('loanId') loanId: string) {
        return this.loanService.getLoanStatusAndHistory(+loanId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin) 
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.loanService.remove(+id);
    }

   
}