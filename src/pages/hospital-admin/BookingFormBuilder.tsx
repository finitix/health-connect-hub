import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, GripVertical, Save, Eye } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type FieldType = Database["public"]["Enums"]["form_field_type"];

interface FormField {
  id?: string;
  field_name: string;
  field_label: string;
  field_type: FieldType;
  is_required: boolean;
  options: string[] | null;
  sort_order: number;
}

const fieldTypeLabels: Record<FieldType, string> = {
  text: "Text",
  number: "Number",
  email: "Email",
  phone: "Phone",
  date: "Date",
  select: "Dropdown",
  textarea: "Text Area",
  checkbox: "Checkbox",
};

const DEFAULT_FIELDS: FormField[] = [
  { field_name: "patient_name", field_label: "Patient Name", field_type: "text", is_required: true, options: null, sort_order: 0 },
  { field_name: "patient_phone", field_label: "Phone Number", field_type: "phone", is_required: true, options: null, sort_order: 1 },
  { field_name: "patient_email", field_label: "Email", field_type: "email", is_required: false, options: null, sort_order: 2 },
];

export default function BookingFormBuilder() {
  const { hospitalId } = useAuth();
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (hospitalId) fetchFields();
  }, [hospitalId]);

  const fetchFields = async () => {
    const { data, error } = await supabase
      .from("booking_form_fields")
      .select("*")
      .eq("hospital_id", hospitalId!)
      .order("sort_order");
    if (error) {
      toast.error("Failed to load form fields");
    } else {
      setFields(data.length > 0 ? data.map(d => ({ ...d, options: d.options ?? null })) : DEFAULT_FIELDS);
    }
    setLoading(false);
  };

  const addField = () => {
    setFields(prev => [
      ...prev,
      {
        field_name: `custom_${Date.now()}`,
        field_label: "",
        field_type: "text",
        is_required: false,
        options: null,
        sort_order: prev.length,
      },
    ]);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    setFields(prev => prev.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  };

  const removeField = (index: number) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  };

  const saveFields = async () => {
    if (!hospitalId) return;
    setSaving(true);

    // Delete existing
    await supabase.from("booking_form_fields").delete().eq("hospital_id", hospitalId);

    // Insert new
    const rows = fields.map((f, i) => ({
      hospital_id: hospitalId,
      field_name: f.field_name,
      field_label: f.field_label,
      field_type: f.field_type,
      is_required: f.is_required,
      options: f.options,
      sort_order: i,
    }));

    const { error } = await supabase.from("booking_form_fields").insert(rows);
    if (error) {
      toast.error("Failed to save form");
    } else {
      toast.success("Booking form saved!");
      fetchFields();
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-bold">Booking Form Builder</h2>
          <p className="text-sm text-muted-foreground">Customize the fields patients fill when booking an appointment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreview(!preview)}>
            <Eye className="h-4 w-4 mr-1" /> {preview ? "Edit" : "Preview"}
          </Button>
          <Button size="sm" onClick={saveFields} disabled={saving}>
            <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save Form"}
          </Button>
        </div>
      </div>

      {preview ? (
        <Card>
          <CardHeader><CardTitle className="text-base">Form Preview</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {fields.map((f) => (
              <div key={f.field_name} className="space-y-1.5">
                <Label className="text-sm">
                  {f.field_label || "Untitled"} {f.is_required && <span className="text-destructive">*</span>}
                </Label>
                {f.field_type === "textarea" ? (
                  <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={f.field_label} disabled />
                ) : f.field_type === "select" ? (
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" disabled>
                    <option>Select {f.field_label}</option>
                    {f.options?.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : f.field_type === "checkbox" ? (
                  <div className="flex items-center gap-2"><input type="checkbox" disabled /><span className="text-sm text-muted-foreground">{f.field_label}</span></div>
                ) : (
                  <Input type={f.field_type === "phone" ? "tel" : f.field_type} placeholder={f.field_label} disabled />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <Card key={field.field_name} className="border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-2 shrink-0 cursor-grab" />
                  <div className="flex-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={field.field_label}
                        onChange={(e) => updateField(index, { field_label: e.target.value, field_name: e.target.value.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") })}
                        placeholder="Field label"
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Type</Label>
                      <Select value={field.field_type} onValueChange={(v) => updateField(index, { field_type: v as FieldType, options: v === "select" ? ["Option 1"] : null })}>
                        <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(fieldTypeLabels).map(([k, v]) => (
                            <SelectItem key={k} value={k}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex items-center gap-2">
                        <Switch checked={field.is_required} onCheckedChange={(v) => updateField(index, { is_required: v })} />
                        <Label className="text-xs">Required</Label>
                      </div>
                    </div>
                    <div className="flex items-end justify-end">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive" onClick={() => removeField(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {field.field_type === "select" && (
                  <div className="mt-3 ml-8 space-y-2">
                    <Label className="text-xs">Options (comma-separated)</Label>
                    <Input
                      value={field.options?.join(", ") || ""}
                      onChange={(e) => updateField(index, { options: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                      placeholder="Option 1, Option 2, Option 3"
                      className="h-9"
                    />
                    <div className="flex flex-wrap gap-1">
                      {field.options?.map(o => <Badge key={o} variant="secondary" className="text-xs">{o}</Badge>)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full" onClick={addField}>
            <Plus className="h-4 w-4 mr-1" /> Add Field
          </Button>
        </div>
      )}
    </div>
  );
}
