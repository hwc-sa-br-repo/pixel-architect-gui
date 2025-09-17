import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, FileText, UserPlus, Settings } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

export const FormComponents = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
    notifications: false,
    newsletter: false,
    terms: false,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Lead Capture Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Formulário de Captação de Lead
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                placeholder="Nome da empresa"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cargo/Função</Label>
            <Select onValueChange={(value) => setFormData({...formData, role: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ceo">CEO/Founder</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="coordinator">Coordenador</SelectItem>
                <SelectItem value="analyst">Analista</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data de Interesse</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notifications"
                checked={formData.notifications}
                onCheckedChange={(checked) => 
                  setFormData({...formData, notifications: checked as boolean})
                }
              />
              <Label htmlFor="notifications">Receber notificações por email</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => 
                  setFormData({...formData, newsletter: checked as boolean})
                }
              />
              <Label htmlFor="newsletter">Inscrever-se na newsletter</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => 
                  setFormData({...formData, terms: checked as boolean})
                }
              />
              <Label htmlFor="terms">Concordo com os termos de uso</Label>
            </div>
          </div>

          <Button variant="gradient" className="w-full">
            Enviar Formulário
          </Button>
        </CardContent>
      </Card>

      {/* Configuration Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-secondary" />
            Configurações do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem Personalizada</Label>
            <Textarea
              id="message"
              placeholder="Digite uma mensagem personalizada para seus leads..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Preferências do Funil</h4>
            
            <RadioGroup defaultValue="automatic">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic">Processamento automático</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Aprovação manual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Modo híbrido</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Configurações Avançadas</h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-nurturing">Auto-nurturing ativo</Label>
              <Switch id="auto-nurturing" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lead-scoring">Lead scoring automático</Label>
              <Switch id="lead-scoring" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="integration">Integração CRM</Label>
              <Switch id="integration" />
            </div>
          </div>

          <Button variant="gradient-secondary" className="w-full">
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};